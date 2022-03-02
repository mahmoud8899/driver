const ControllerOder = require('../controller/Order_Controller')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')



// create order...
router.post('/order/order/', verify, ControllerOder.CreateOrder)



// show order user ...
router.get('/order/userid/', verify, ControllerOder.ordershowUserid)
// restranges natifations  max 10 orders 
// GET
router.get('/order/restrange/:cartinfo/', ControllerOder.TheRestrangesOrders)
// show order id ...
router.get('/order/order/:id/', ControllerOder.ShowOrderId)


// remove order user from user...
router.delete('/order/order/user/:id/', verify, ControllerOder.removeOrderId)

// only Admin ....
router.post('/order/order/change/:id/',
    verify, Admin,
    ControllerOder.Delivered)

// view all orders  only Admin............
router.get('/order/view/all/order/:cartinfo/',ControllerOder.ViewAllOrders)


// search order name....
router.post('/order/srarch/userId', verify, ControllerOder.AddSearch)


module.exports = router