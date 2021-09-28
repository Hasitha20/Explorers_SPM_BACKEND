const mongoose = require('mongoose')

const empPaymentScema = new mongoose.Schema({
    empName: {
        type: String,
        required: true,
        trim: true
    },
    basicSal: {
        type: Number,
        required: true
    },
    workingHours: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('EmpPayments', empPaymentScema)