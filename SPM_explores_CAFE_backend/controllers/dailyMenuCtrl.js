const DailyMenu = require ('../models/dailyMenuModel')
const dailyMenuCtrl = {

    getDailyMenu: async (req, res) => {
        try {
            const dailymenu = await DailyMenu.find()
            res.json(dailymenu)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createDailyMenu : async (req, res) => {
        try {

            const {dailymenu_id, dailymenuName, date, foods} = req.body;

            const dailymenu = await DailyMenu.findOne({dailymenu_id})

            if(dailymenu)
                return res.status(400).json({msg: "This DailyMenu already exists."})
            
            const newDailyMenu = new DailyMenu({
                dailymenu_id, 
                dailymenuName, 
                date,
                foods
            })

            await newDailyMenu.save()
            res.json({msg: "New Daily Menu Created."})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteDailyMenu: async (req, res) => {
        try {
            await DailyMenu.findByIdAndDelete(req.params.id)
            res.json({msg: "Delete the DailyMenu"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateDailyMenu : async (req, res) => {
        try {
            const {dailymenu_id, dailymenuName, date, foods} = req.body;

            await DailyMenu.findOneAndUpdate({_id: req.params.id}, {
                dailymenuName, 
                date,
                foods
            })
            
            res.json({msg: "Updated a Daily Menu"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = dailyMenuCtrl