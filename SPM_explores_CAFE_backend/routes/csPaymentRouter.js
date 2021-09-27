const router = require('express').Router()
const CSPaymentCtrl = require('../controllers/csPaymentCtrl')
const auth = require('../middleware/csauth');
const authCashier = require('../middleware/csauthCashier')


router.route('/cspayments')
    .get(CSPaymentCtrl.getCSPayments)
    .post(CSPaymentCtrl.createPayment)

module.exports = router