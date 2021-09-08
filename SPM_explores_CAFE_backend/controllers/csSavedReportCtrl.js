const SavedReport = require('../models/csSavedReportModel')

const savedReportCtrl = {
    getSavedReports : async (req, res) =>{
        try{
            const savedReports = await SavedReport.find()
            res.json(savedReports)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createReport : async (req, res) =>{
        try{
        
            const {date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges  } = req.body;
            
            const savedReport = await SavedReport.findOne({date})
            if(savedReport)  return res.status(400).json({msg: "In this date already saved or submitted report"})
          

            const newReport = new SavedReport({
                date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges
            })
            await newReport.save()
            res.json({msg: "Report saved successfully"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteSavedReport: async (req, res) =>{
        try{
            await SavedReport.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Saved Report"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateSavedReport: async (req, res) =>{
        try{
            const {date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges  } = req.body;

            await SavedReport.findOneAndUpdate({_id: req.params.id}, {date, start_time, end_time, orders_count,
            complete_orders_count, canceled_orders_count, revenue, other_payments, total_suppliers_charges})

            res.json({msg: "Updated a saved Report"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = savedReportCtrl