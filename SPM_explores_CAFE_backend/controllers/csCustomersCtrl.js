const csCustomers = require('../userModels/userModel')


const csCustomerCtrl = {

   
   
    getCustomers: async(req, res) =>{
        try{
            const customers = await csCustomers.find({role: {$nin: [1, 2, 3, 4, 5, 6]}})
            res.json(customers)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }

}




module.exports = csCustomerCtrl