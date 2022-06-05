const router = require('express').Router()
const ProductControll = require('../controller/Product_Controller')
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')




// Restaurant products filter
// GET // Searching...
router.get('/product/product/:id/', ProductControll.RestaurantProductsFilter)


// create discount////
router.put('/product/discount/', ProductControll.discountPric)


// Products the best rating
router.get('/product/product/top/', ProductControll.getTopProduct)



// Latest Products
router.get('/product/product/last/', ProductControll.newProduct)


// create post... 
// POST
router.post('/product/create/', verify, ProductControll.CreateProduct)

// Restaurant products..
// GET
router.get('/product/cartinfo/:id', ProductControll.CartInDetailProducts)


// delete... 
router.delete('/product/product/:id/',  ProductControll.DeleteProduct)


// update product only admin ....
router.put('/product/product/updated/:id/', ProductControll.UpdatedProduct)

// product id// 
router.get('/product/product/details/:id/', ProductControll.productID)
// add commit... 
router.post('/product/product/comment/:id/', verify, ProductControll.AddComment)

// delete commit from post. 
router.delete('/product/product/removereview/:id/', verify, ProductControll.deleteComment)



// Update comment and Reviews....
router.put('/product/comment/update/update/:id/', verify, ProductControll.UpdateCommentReview)






module.exports = router