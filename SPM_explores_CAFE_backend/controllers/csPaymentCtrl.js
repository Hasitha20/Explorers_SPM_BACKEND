const CSPayments = require('../models/csPaymentModel')
const CSUsers = require('../models/csUserModel')
const CSFoods = require('../models/foodModel')
const CSOrders = require('../models/csOrdersModel')

const PaymentCtrl = {
    getCSPayments: async(req, res) =>{
        try{
            const csPayments = await CSPayments.find()
            res.json(csPayments)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res)=>{
        try{
            const csorder = await CSOrders.findById(req.csorder.id)
            if(!csorder)  return res.status(400).json({msg: err.message})

            const csuser = await CSUsers.findById(req.csuser.id).select('name email')
            if(!csuser)  return res.status(400).json({msg: err.message})

            const {itemList, user_id, paymentID} = req.body;
            const {_id} = csorder;
            const {name, email} = csuser;

            const newPayment = new CSPayments({
                orderid: _id,user_id, name, email, itemList, paymentID
            })
            
            itemList.filter(item=>{
                return sold(item._id, item.quantity, item.sold)
            })
            await newPayment.save()
            res.json({msg: "Payment success!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }

}
const sold = async (id, quantity, oldSold) =>{
    await CSFoods.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })

}
module.exports = PaymentCtrl