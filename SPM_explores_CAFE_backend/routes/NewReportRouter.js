const newReportRouter = require('express').Router();
const NewReport = require('../models/Report');

/**newReportRouter.route("/getAll").get((req, res) => {
    CashierReport.find({}, function(docs, err) {
        if(!err){
            res.send(docs);

        }
        else{
            res.send(err);
        }
    })
 * 
 */
/* newReportRouter.route("/getSingleReportForDisplay").post((req, res) => {
    NewReport.find({reportID: req.body.reportID}, (docs, err) => {
        if(!err){
            res.send(docs);
        }else{
            res.send(err);
        }
    })
})
 */
newReportRouter.route("/submitReport").post((req, res) => {
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

    const newCashierReport = NewReport({
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
    newCashierReport.save().then(() => {
        res.json("Report Submitted")
    }).catch((err) => {
        console.log(err)
    })
})

newReportRouter.route("/getAll").get((req, res) => {
    NewReport.find({}, function(docs, err) {
        if(!err){
            res.send(docs);

        }
        else{
            res.send(err);
        }
    })
})
module.exports = newReportRouter;


