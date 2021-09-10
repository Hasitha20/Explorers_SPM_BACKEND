const mongoose = require('mongoose')

const csUserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: Number,
        default: 0
    },
    images:{
        type: Object,
        default: []
    },
    cart: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

module.exports = mongoose.model('csUsers', csUserSchema)