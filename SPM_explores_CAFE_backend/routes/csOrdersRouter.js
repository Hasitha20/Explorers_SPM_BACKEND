const router = require('express').Router()
const CSOrdersCtrl = require('../controllers/csOrdersCtrl')



router.route('/csorder')
    .get(CSOrdersCtrl.getOrders)
    .post(CSOrdersCtrl.createOrder)

router.route('/csorder/:id')
    .delete(CSOrdersCtrl.deleteOrder)
    .put(CSOrdersCtrl.updateOrder)
module.exports = router