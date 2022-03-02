const router = require('express').Router()
const ChatController = require('../controller/MessageChat_Controller')
const verify = require('../Jwt/Verfiy')
// create Message
router.post('/message/create/', ChatController.createChat)
// view chat
router.get('/message/view/:id/', ChatController.ViewChat)

// send Messages...
router.post('/message/createmessage/:id/', verify, ChatController.CreateMessage)

// VIEWA ALL chat...
router.get('/message/all/chat/:id/', ChatController.AllChat)

module.exports = router