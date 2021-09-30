const router = require('express').Router()
const  csCustomerCtrl= require('../controllers/csCustomersCtrl')



router.route('/cscustomers')
    .get(csCustomerCtrl.getCustomers)


module.exports = router