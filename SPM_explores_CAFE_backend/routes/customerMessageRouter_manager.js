const router = require('express').Router()
const customerMessageCtrl_manager = require('../controllers/customerMessageCtrl_manager')

router.route('/message')
    .get(customerMessageCtrl_manager.getNotReadMessages)
    .post(customerMessageCtrl_manager.placeMessage)

router.route('/message/:id')
    .put(customerMessageCtrl_manager.updateMessage)

router.route('/allMessages')
    .get(customerMessageCtrl_manager.getAllMessages)

module.exports = router