const categoryCashierRouter = require('express').Router();
let CategoryCashier = require('../models/categoryModel');

categoryCashierRouter.route("/displayAllCategory").get((req, res) => {
    CategoryCashier.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
categoryCashierRouter.route("/updateCashierReport").post((req, res)=>{
    CategoryCashier.findOneAndUpdate({reportid:req.body.reportid}, {
        date: req.body.date,
        start_time:req.body.start_time,
        end_time: req.body.end_time,
        orders_count: req.body.orders_count,
        complete_orders_count:req.body.complete_orders_count,
        canceled_orders_count: req.body.canceled_orders_count,
        revenue: req.body.revenue,
        other_payments: req.body.other_payments,
        total_suppliers_charges: req.body.total_suppliers_charges
    }, (err)=>{
        if(!err){
            res.send("report updated")
        }else{
            res.send(err)
        }
       
    })

})
module.exports = categoryCashierRouter;