const submitReport = require('../models/csSubmitReportModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query


        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        
        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const submitReportCtrl = {
    getsubmitReports : async (req, res) =>{
        try{
            const features = new APIfeatures(submitReport.find(), req.query).filtering().sorting().paginating()
            const submitReports = await features.query

            res.json({
                status: 'success',
                result: submitReports.length,
                submitReports: submitReports
            })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createReport : async (req, res) =>{
        try{
        
            const {date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges  } = req.body;
            
            const submittedReport = await submitReport.findOne({date})
            if(submittedReport)  return res.status(400).json({msg: "In this date already submitted "})
          

            const newReport = new submitReport({
                date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges
            })
            await newReport.save()
            res.json({msg: "Report submit successfully"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deletesubmitReport: async (req, res) =>{
        try{
            await submitReport.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Saved Report"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updatesubmitReport: async (req, res) =>{
        try{
            const {date, start_time, end_time, orders_count,complete_orders_count, 
                canceled_orders_count, revenue, other_payments, total_suppliers_charges  } = req.body;

            await submitReport.findOneAndUpdate({_id: req.params.id}, {date, start_time, end_time, orders_count,
            complete_orders_count, canceled_orders_count, revenue, other_payments, total_suppliers_charges})

            res.json({msg: "Updated a saved Report"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getSingleReport: async(req, res) =>{
        try{
            const reporthistory = await submitReport.find({_id: req.params.id})

            res.json(reporthistory)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = submitReportCtrl