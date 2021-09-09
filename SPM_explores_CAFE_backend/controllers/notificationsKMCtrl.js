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
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateMessagesKM: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = notificationsKMCtrl