const router = require('express').Router()
const submitReportCtrl = require('../controllers/csSubmitReportsCtrl')



router.route('/submitreport')
    .get(submitReportCtrl.getsubmitReports)
    .post(submitReportCtrl.createReport)

router.route('/submitreport/:id')
    .delete(submitReportCtrl.deletesubmitReport)
    .put(submitReportCtrl.updatesubmitReport)
    .get(submitReportCtrl.getSingleReport)

module.exports = router