const router = require('express').Router()
const cashierReportsCtrl = require('../controllers/cashierReportCtrl')
const auth = require('../middleware/auth')
const authCashier = require('../middleware/authCashier')
const authAdmin = require('../middleware/authAdmin')


router.route('/cashierReport')
    .get(auth, authCashier, authAdmin, cashierReportsCtrl.getReports)
    .post(auth, authCashier, cashierReportsCtrl.createReport)

router.route('/cashierReport/:id')
    .post(auth, authCashier, cashierReportsCtrl.deleteReport)
    .put(auth, authCashier, cashierReportsCtrl.updateReport) 

module.exports = router