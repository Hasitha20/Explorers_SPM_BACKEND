const router  = require('express').Router()
const notificationsKMCtrl = require ('../controllers/notificationsKMCtrl')

router.route('/messagekm')
    .get(notificationsKMCtrl.getMessagesKM)
    .post(notificationsKMCtrl.createMessagesKM)

router.route('/messagekm/:id')
    .delete(notificationsKMCtrl.deleteMessagesKM)
    .put(notificationsKMCtrl.updateMessagesKM)

module.exports = router