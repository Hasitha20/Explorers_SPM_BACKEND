const Salary = require('../models/employeePaymentsModel')
const employeePaymentsCtrl = {
    createPaymentRecord: async (req, res) => {
        try {
            const {empName, basicSal, workingHours, salary} = req.body;
            const newRecord = new Salary({
                empName: empName.toLowerCase(),
                basicSal,
                workingHours,
                salary
            })
            await newRecord.save()
            res.json({msg: "Payment added to the employee"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getRecords: async (req, res) => {
        try {
            const salaryRecords = await Salary.find()
            res.json(salaryRecords)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = employeePaymentsCtrl