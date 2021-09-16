const router = require('express').Router()
const userCtrl = require('../userControllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register) 
router.post('/login', userCtrl.login) 

//logout router 
router.get('/logout', userCtrl.logout) 
router.post('/refresh_token', userCtrl.refreshToken) 
//this is used to get user informations
router.get('/infor',auth, userCtrl.getUser)

router.get('/customerList', userCtrl.getCustomerInformation)

module.exports = router