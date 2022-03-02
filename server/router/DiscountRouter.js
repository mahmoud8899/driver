const router = require('express').Router()

const discountController = require('../controller/DiscountCodeController')
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')


// create 
router.post('/discount/', verify,Admin, discountController.CreateDiscount)
// show ... 

router.get('/discount/all/', verify,Admin, discountController.showDiscount)
// remove dicount after shipping...
router.delete('/discount/remove/',  discountController.removeItemDiscount)
// check if you have... 
router.post('/discount/checkin/', verify, discountController.CheckInCode)



module.exports = router