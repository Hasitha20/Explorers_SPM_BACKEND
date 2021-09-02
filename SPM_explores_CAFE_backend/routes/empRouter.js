const router = require('express').Router()
const empCtrl = require('../controllers/empCtrl')

router.post('/register', empCtrl.regoster)

module.exports = router