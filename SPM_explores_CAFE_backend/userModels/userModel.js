const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        trim: true
    },

    email: {
        type: String,
        required: true,
        //required: [true, 'Email field is required'],
        unique: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }, 
    role: {
        type: Number,
        default:0
    },

    mobile: {
        type: Number,
        default:0
    }


},{
    //using timestamps we can know created time and date
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)