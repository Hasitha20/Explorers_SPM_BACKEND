const mongoose = require('mongoose')

const csSavedReportsSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    start_time:{
        type: String,
        required: true
    },
    end_time:{
        type: String,
        required: true
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
    timestamps:true
})

module.exports = mongoose.model("csSavedReports", csSavedReportsSchema)