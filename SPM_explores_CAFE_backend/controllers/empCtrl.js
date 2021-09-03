const Employees = require('../models/empModel')
//const bcrypt = require('bcrypt')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const empCtrl = {
    register: async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                designation,
                phone,
                gender,
                emergencyPhone,
                dutyType,
                userName
            } = req.body;

            const employee = await Employees.findOne({email})
            if(employee) return res.status(400).json({msg: "The email already exist."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password should have at least 6 characters"})

            const passwordHash = await bcrypt.hash(password, 10)
            const newEmp = new Employees({
                name,
                email,
                password : passwordHash,
                designation,
                phone,
                gender,
                emergencyPhone,
                dutyType,
                userName
            })
            await newEmp.save()

            const accesstoken = createAccessToken({id: newEmp._id})
            const refreshtoken = createRefreshToken({id: newEmp._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/emp/refresh_token'
            })

            res.json({accesstoken})
            //res.json({msg: "Registered."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const employee = await Employees.findOne({email})

            if(!employee) return res.status(400).json({msg: "Employee does not exist."})

            const isMatch = await bcrypt.compare(password, employee.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password"})

            const accesstoken = createAccessToken({id: employee._id})
            const refreshtoken = createRefreshToken({id: employee._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/emp/refresh_token'
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/emp/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if(!rf_token) return res.status(400).json({msg: "Please login or register."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, emp) => {
                if(err) return res.status(400).json({msg: "Please login or register."})
                
                const accesstoken = createAccessToken({id: emp.id})
                
                res.json({accesstoken})
            })

            //res.json({rf_token})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getEmployee: async (req, res) => {
        try {
            const employee = await Employees.findById(req.employee.id).select('-password')
            if(!employee) return res.status(400).json({msg: "Employee does not exist"})

            res.json(employee)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (employee) => {
    return jwt.sign(employee, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3d'})
}

const createRefreshToken = (employee) => {
    return jwt.sign(employee, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = empCtrl