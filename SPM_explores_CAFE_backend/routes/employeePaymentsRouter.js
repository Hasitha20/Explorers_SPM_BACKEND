const router = require('express').Router()
const salaryRecord = require('../controllers/employeePaymentsCtrl')

router.route('/empSal')
    .get(salaryRecord.getRecords)
    .post(salaryRecord.createPaymentRecord)


module.exports = router