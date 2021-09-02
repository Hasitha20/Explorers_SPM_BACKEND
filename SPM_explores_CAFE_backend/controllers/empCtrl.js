const Employees = require('../models/empModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const empCtrl = {
    regoster: async (req, res) => {
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
                password,
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
    }
}

const createAccessToken = (employee) => {
    return jwt.sign(employee, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3d'})
}

const createRefreshToken = (employee) => {
    return jwt.sign(employee, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = empCtrl