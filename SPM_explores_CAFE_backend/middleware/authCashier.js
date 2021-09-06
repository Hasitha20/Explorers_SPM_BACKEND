const Users = require('../models/userModel')

const authCashier = async(req, res, next) =>{
    try{
        //Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
            return res.status(400).json({msg: "Cashier resources access denied"})
        if(user.role === 3)
            return res.status(400).json({msg: "Cashier resources access denied"})
        next()
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authCashier