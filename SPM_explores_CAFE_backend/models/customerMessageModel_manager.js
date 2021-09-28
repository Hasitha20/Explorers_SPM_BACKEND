const mongoose = require('mongoose')

const customerMessageSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Not read"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("UserMesseage", customerMessageSchema)