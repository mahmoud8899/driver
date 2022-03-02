const router = require('express').Router()
const ProductControll = require('../controller/Product_Controller')
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')
const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})
















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
router.post('/product/create/', verify, ProductControll.CreateProduct)

// Restaurant products..
// GET
router.get('/product/cartinfo/:id', ProductControll.CartInDetailProducts)


// delete... 
router.delete('/product/product/:id/', verify, Admin, ProductControll.DeleteProduct)


// update product only admin ....
router.put('/product/product/edit/:id/', ProductControll.EditProduct)



// product id// 
router.get('/product/product/details/:id/', ProductControll.productID)
// add commit... 
router.post('/product/product/comment/:id/', verify, ProductControll.AddComment)

// delete commit from post. 
router.delete('/product/product/removereview/:id/', verify, ProductControll.deleteComment)



// Update comment and Reviews....
router.put('/product/comment/update/update/:id/', verify, ProductControll.UpdateCommentReview)






module.exports = router