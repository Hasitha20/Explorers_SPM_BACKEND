const router = require('express').Router()
const dailyMenuCtrl = require ("../controllers/dailyMenuCtrl")

router.route('/dailymenu')
    .get(dailyMenuCtrl.getDailyMenu)
    .post(dailyMenuCtrl.createDailyMenu)

router.route('/dailymenu/:id')
    .delete(dailyMenuCtrl.deleteDailyMenu)
    .put(dailyMenuCtrl.updateDailyMenu)

module.exports = router