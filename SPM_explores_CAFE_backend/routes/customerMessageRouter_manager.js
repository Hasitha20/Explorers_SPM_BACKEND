const router = require('express').Router()
const customerMessageCtrl_manager = require('../controllers/customerMessageCtrl_manager')

router.route('/message')
    .get(customerMessageCtrl_manager.getMessages)
    .post(customerMessageCtrl_manager.placeMessage)

router.route('/message/:id')
    .put(customerMessageCtrl_manager.updateMessage)

module.exports = router