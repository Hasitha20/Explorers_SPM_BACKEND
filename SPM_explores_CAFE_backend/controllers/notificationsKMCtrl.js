const MessagesKM = require ('../models/notificationsKM')

const notificationsKMCtrl = {

    getMessagesKM: async (req, res) => {
        try {
            const messageskm = await MessagesKM.find()

            res.json(messageskm)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createMessagesKM: async (req, res) => {
        try {
            const {message_id, title, description} = req.body;

            const messageskm = await MessagesKM.findOne({message_id})
            if(messageskm)

            return res.status(400).json({msg: "This Product already exists!"})

            const newMessagekm = new MessagesKM({
                message_id, 
                title, 
                description
            })

            await newMessagekm.save()

            res.json({msg: "new Message created!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteMessagesKM: async (req, res) => {
        try {
            await MessagesKM.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Food Item!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateMessagesKM: async (req, res) => {
        try {
            const {message_id, title, description} = req.body;

            await MessagesKM.findOneAndUpdate({_id: req.params.id}, {
                message_id, title, description
            })

            res.json({msg: "Updated a Food Item!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = notificationsKMCtrl