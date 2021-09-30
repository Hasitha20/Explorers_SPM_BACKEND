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
            const {orderid, user_id, paymentID, itemList } = req.body;
            
            const payment = await CSPayments.findOne({paymentID})

            if(payment) return res.status(400).json({msg: "This order already added payments.Again cannot added"})

            const newPayment = new CSPayments({
                orderid, user_id, paymentID, itemList
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