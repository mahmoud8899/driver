const router = require('express').Router()
const fromAdd = require('../controller/Cart_Controller')
const Verify = require('../Jwt/Verfiy')


// show all cart..
router.get('/cart/visw/cart/', Verify, fromAdd.ViswCartUser)

// create cart items.....
router.post('/cart/add/cart/create/', Verify, fromAdd.AddCart)



// delete cart
router.delete('/cart/add/deletecart/:id/', Verify, fromAdd.deleteCart)


// cleaning 
router.delete('/cart/cleaning/user/', Verify,fromAdd.CleaningCart)

module.exports = router