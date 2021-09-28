const router = require('express').Router()
const CSOrdersCtrl = require('../controllers/csOrdersCtrl')

const auth = require('../middleware/csauth');

router.route('/csorder')
    .get(CSOrdersCtrl.getOrders)
    .post(CSOrdersCtrl.createOrder)

router.route('/csorder/:id')
    .delete(CSOrdersCtrl.deleteOrder)
    .put(CSOrdersCtrl.updateOrder)
    .get(CSOrdersCtrl.getSingleOrder)

router.route('/additems/:id')
    .patch(auth, CSOrdersCtrl.addItemList)
module.exports = router