const router = require('express').Router()
const savedReportCtrl = require('../controllers/csSavedReportCtrl')
const auth = require('../middleware/csauth');
const authCashier = require('../middleware/csauthCashier')


router.route('/savedreport')
    .get(savedReportCtrl.getSavedReports)
    .post(auth, authCashier, savedReportCtrl.createReport)

router.route('/savedreport/:id')
    .delete(auth, authCashier, savedReportCtrl.deleteSavedReport)
    .put(auth, authCashier, savedReportCtrl.updateSavedReport)
module.exports = router