const cashierReportRouter = require('express').Router();
const CashierReport = require('../models/cashierReportModel');

//add new
cashierReportRouter.route("/addNewReport").post((req, res) => {
    const reportid = req.body.reportid;
    const date = req.body.date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time
    const orders_count = req.body.orders_count;
    const complete_orders_count = req.body.complete_orders_count;
    const canceled_orders_count = req.body.canceled_orders_count;
    const revenue = req.body.revenue;
    const other_payments = req.body.other_payments;
    const total_suppliers_charges = req.body.total_suppliers_charges;

    if(!orders_count && !complete_orders_count && !canceled_orders_count && !total_suppliers_charges &&
        !revenue && !other_payments ) return res.status(400).json({msg: "Orders count is not included"})
    
    const newCashierOrder = new CashierReport({
        reportid,
        date,
        start_time,
        end_time,
        orders_count,
        complete_orders_count,
        canceled_orders_count,
        revenue,
        other_payments,
        total_suppliers_charges
    })
    newCashierOrder.save().then(() => {
        res.json("Report Saved")
    }).catch((err) => {
        console.log(err)
    })
})

cashierReportRouter.post('/deleteCashierReport', (req, res) => {
    CashierReport.findOneAndDelete({_id: req.body.id}, (err) => {
        if(!err){
            res.send('Report Deleted')
        }else{
            res.send(err)
        }
    })
    console.log(req.body.id);
})
/*
adminConferenceRouter.route("/updateconference").post( (req, res) => {
    ConferenceAdmin.findOneAndUpdate({conferenceid: req.body.conferenceid}, {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        note: req.body.note

    }, () => {
        if(!err){
            res.send('Updated details')
        }
        else{
            res.send(err)
        }
    })
})
*/
cashierReportRouter.route("/updateCashierReport").post((req, res)=>{
    CashierReport.findOneAndUpdate({reportid:req.body.reportid}, {
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


cashierReportRouter.route("/getAll").get((req, res) => {
    CashierReport.find({}, function(docs, err) {
        if(!err){
            res.send(docs);

        }
        else{
            res.send(err);
        }
    })
})
/**adminConferenceRouter.route("/getSingleConference").post( (req, res) => {
    ConferenceAdmin.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
 * 
 */

cashierReportRouter.route("/getSingle").post(async(req, res) => {
    CashierReport.find({reportid:req.body.reportid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})


/*
adminConferenceRouter.route("/getSingleConference").post( (req, res) => {
    ConferenceAdmin.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
*/
module.exports = cashierReportRouter;