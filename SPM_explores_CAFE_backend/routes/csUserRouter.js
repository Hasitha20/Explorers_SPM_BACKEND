const router = require('express').Router()
const csUserCtrl = require('../controllers/csUserCtrl')
const csauth = require('../middleware/csauth')

router.post('/register', csUserCtrl.register)

router.post('/login', csUserCtrl.login)

router.get('/logout', csUserCtrl.logout)

router.get('/refresh_token', csUserCtrl.refreshToken)

router.get('/infor',csauth, csUserCtrl.getUser)
module.exports = router