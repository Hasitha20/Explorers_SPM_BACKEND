const mongoose = require('mongoose')

const csOrdersSchema = new mongoose.Schema({
    orderid:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },    
    customerid:{
        type: String,
        required: true
    },
    customername:{
        type: String,
        required: true,
        trim: true
    },
    totalPrice:{
        type: Number,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true
    },
    itemList:{
        type: Array,
        default: []
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("csOrders", csOrdersSchema)