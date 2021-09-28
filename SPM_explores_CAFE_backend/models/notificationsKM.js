const mongoose = require ('mongoose');

const messageKMSchema = new mongoose.Schema({
    message_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,        
        required: true
    },


}, {
    timestamps: true
})

module.exports = mongoose.model("Messages_KM", messageKMSchema)