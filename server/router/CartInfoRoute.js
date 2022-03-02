const CartInfoController = require('../controller/CartInfoController')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
// const Up  = require('./testing')


// create new restarange..
// POST
router.post('/cartinfo/create/', verify, CartInfoController.CreateNewRes)

router.get('/cartinfo/info/:id/', CartInfoController.CartInfoIDUser)

// fri delevery 
router.get('/cartinfo/freedelvery/', CartInfoController.FreeDlevery)

// Updated
// PUT 
router.put('/cartinfo/updated/:id/', CartInfoController.UpdateCartInfo)

// cartinfo id
// GET
router.get('/cartinfo/view/:username/', CartInfoController.CartinfoId)

// views all restarg
// post 
router.get('/cartinfo/views/:city/:productType/', CartInfoController.ShowsAll)
// new restranges 
// max 8 
router.get('/cartinfo/limit/:city/:productType/', CartInfoController.NewRestranges)
// filter category
// get
router.get('/cartinfo/restrang/:city/:productType/', CartInfoController.FilterRestranges)
// add comment
// POST/
router.post('/cartingo/comment/user/:id/', verify, CartInfoController.CartInfoAddComment)



module.exports = router