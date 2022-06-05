const CartInfoController = require('../controller/CartInfoController')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
// const Up  = require('./testing')


// restaurant id 
router.get('/cartinfo/:id/', CartInfoController.RestaurantID)
// filter
router.get('/cartinfo/filter/:lat/:long/', CartInfoController.FilterRestranges)


// maps 
router.get('/cartinfo/maps/:lat/:long', CartInfoController.LocationMpas)

// create new restarange..
// POST
router.post('/cartinfo/create/', verify, CartInfoController.CreateNewRes)
// user get infot
router.get('/cartinfo/info/user/', verify, CartInfoController.CartInfoIDUser)

// free delevery 
router.get('/cartinfo/freedelvery/:lat/:long/', CartInfoController.FreeDlevery)

// Updated
// PUT 
router.put('/cartinfo/updated/:id/', CartInfoController.UpdateCartInfo)

// cartinfo id
// GET
router.get('/cartinfo/view/:username/', CartInfoController.CartinfoId)

// views all restarg
// post 
router.get('/cartinfo/views/:lat/:long/:productType/', CartInfoController.ShowsAll)
// BestRestrant
// max 6
router.get('/cartinfo/best/:lat/:long/', CartInfoController.BestRestrant)

// add comment
// POST/
router.post('/cartingo/comment/user/:id/', verify, CartInfoController.CartInfoAddComment)



module.exports = router