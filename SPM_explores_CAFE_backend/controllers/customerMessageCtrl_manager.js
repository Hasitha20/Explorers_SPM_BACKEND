const Messages = require('../models/customerMessageModel_manager')

const customerMessageCtrl_manager = {
    getNotReadMessages: async (req, res) => {
        try {//{"status": {$ne: "Not checked"}
            const messages = await Messages.find({"status": {$ne: "Read"}})
            res.json(messages)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllMessages: async (req, res) => {
        try {//{"status": {$ne: "Not checked"}
            const messages = await Messages.find()
            res.json(messages)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    placeMessage: async (req, res) => {
        try {
            const {userName, subject, message, status} = req.body;

            const newMessage = new Messages({userName, subject, message, status})
            await newMessage.save()
            res.json({msg: "Added new Message."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMessage: async (req, res) => {
        try {
            const {status} = req.body;
            await Messages.findOneAndUpdate({_id: req.params.id},{
                status
            })
            res.json({msg: "Updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})   
        }
    }
}

module.exports = customerMessageCtrl_manager