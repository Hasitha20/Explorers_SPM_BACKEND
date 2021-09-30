const csUsers = require('../models/csUserModel')
const CSPayments = require('../models/csPaymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const csUserCtrl = {

    register: async (req, res) =>{
        try{
            const {name, email, password, images} = req.body;

            const user = await csUsers.findOne({email})

            if(user) return res.status(400).json({msg: "The email already exists"})
            if(password.length < 6)
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            //Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new csUsers({
                name, email, password: passwordHash, images
            })
           // res.json({password, passwordHash})

            await newUser.save()

            //Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/csuser/refresh_token'
            })

            res.json({accesstoken})
            //res.json({msg: "Register Success!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, csUser)=>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: csUser.id})

                res.json({accesstoken})
             })
        //res.json({rf_token})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
        
    },
    login: async (req, res) =>{
        try{
            const {email, password} = req.body;

            const csuser = await csUsers.findOne({email})
            if(!csuser) return res.status(400).json({msg: "User does not exist"})

            const isMatch = await bcrypt.compare(password, csuser.password)
            if(!isMatch) return res.status(500).json({msg: "Incorrect password"})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: csuser._id})
            const refreshtoken = createRefreshToken({id: csuser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/csuser/refresh_token'
            })

            res.json({accesstoken})

            

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try{
            res.clearCookie('refreshtoken', {path: '/csuser/refresh_token'})
            return res.json({msg: "Logged out"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res)=>{
        try{
            const csuser = await csUsers.findById(req.csuser.id).select('-password')
            if(!csuser) return res.status(400).json({msg: "User does not exist"})


            res.json(csuser)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getPaymenthistory: async(req, res) =>{
        try{
            const history = await CSPayments.find({user_id: req.user.id})

            res.json(history)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getCustomers: async(req, res) =>{
        try{
            const customers = await csUsers.find({role: {$nin: [1, 2, 3, 4]}})
            res.json(customers)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }

}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = csUserCtrl