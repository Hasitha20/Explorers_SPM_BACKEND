const CashierReport = require('../models/cashierReportModel')

const cashierReportsCtrl = {
    getReports: async(req, res) =>{
        try{
            const cashierReports = await CashierReport.find()
            res.json(cashierReports)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
     },
    createReport: async (req, res) => {
        try {
            const {date, start_time, end_time, orders_count, complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges, status} = req.body;
            if(!date) return res.status(400).json({msg: "Date is not included"})

            const cashierReport = await CashierReport.findOne({date})

            if(cashierReport)
            return res.status(400).json({msg: "This report already exists."})

            const newCashierReport = new CashierReport({
                date,
                start_time,
                end_time,
                orders_count,
                complete_orders_count, 
                canceled_orders_count,
                revenue,
                other_payments,
                total_suppliers_charges,
                status
            })
            await newCashierReport.save()
            res.json({msg: "Create Report"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteReport: async(req, res)=>{
      try{
        await CashierReport.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Report"})
      }catch(err){
        return res.status(500).json({msg: err.message}) 
      }
    },
    updateReport: async(req, res)=>{
        try{
         const {date, start_time, end_time, orders_count, complete_orders_count, 
            canceled_orders_count, revenue, other_payments, total_suppliers_charges, status} = req.body;
         await CashierReport.findOneAndUpdate({_id: req.params.id}, {date, start_time, end_time, orders_count, complete_orders_count, 
            canceled_orders_count, revenue, other_payments, total_suppliers_charges,status})

         res.json({msg: "Updated a Report"})
        }catch(err){
          return res.status(500).json({msg: err.message}) 
        }
      }

}

module.exports = cashierReportsCtrl