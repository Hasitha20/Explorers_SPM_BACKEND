const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    itemList: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("csPayments", paymentSchema)