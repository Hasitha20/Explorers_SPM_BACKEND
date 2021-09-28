const mongoose = require('mongoose')

const dailyMenuSchema = new mongoose.Schema({
    dailymenu_id: {
        type: String,
        unique: true,
        trim: true,
         
    },
    dailymenuName: {
        type: String,         
        trim: true
    },
    date: {
        type: Date,
        require: true
    } ,
    foods:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("DailyMenu", dailyMenuSchema)