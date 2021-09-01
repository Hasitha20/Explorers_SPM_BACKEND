const mongoose = require('mongoose');

const cashierReportSchema = new mongoose.Schema({
    reportid:{
        type:String,
        require:true
    },
    date:{
        type: Date
    },
    start_time:{
        type: String,
    },
    end_time:{
        type: String,
        
    },    
    orders_count:{
        type: Number,
        required: true,
        trim: true
    },
    complete_orders_count:{
        type: Number,
        required: true,
        trim: true
    },
    canceled_orders_count:{
        type: Number,
        required: true,
        trim: true
    },
    revenue:{
        type: Number,
        required: true,
        trim: true
    },
    other_payments:{
        type: Number,
        trim: true
    },
    total_suppliers_charges:{
        type: Number,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('submitCashiernewReports', cashierReportSchema);