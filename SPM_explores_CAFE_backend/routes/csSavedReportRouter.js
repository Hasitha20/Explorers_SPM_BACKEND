const router = require('express').Router()
const savedReportCtrl = require('../controllers/csSavedReportCtrl')
const auth = require('../middleware/csauth');
const authCashier = require('../middleware/csauthCashier')


router.route('/savedreport')
    .get(savedReportCtrl.getSavedReports)
    .post(savedReportCtrl.createReport)

router.route('/savedreport/:id')
    .delete(savedReportCtrl.deleteSavedReport)
    .put(savedReportCtrl.updateSavedReport)
module.exports = router