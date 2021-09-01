const router = require('express').Router()
const cashierReportsCtrl = require('../controllers/cashierReportCtrl')


router.route('/cashierReport')
    .get(cashierReportsCtrl.getReports)
    .post(cashierReportsCtrl.createReport)

router.route('/cashierReport/:id')
    .post(cashierReportsCtrl.deleteReport)
    .put(cashierReportsCtrl.updateReport) 

module.exports = router