const router = require('express').Router()
const FoodTypes = require('../controller/FoodTypeController')
const verify = require('../Jwt/Verfiy')


// create food type
router.post('/foodtypes/create/', verify, FoodTypes.CreateFoodTypes)

// views all food type
router.get('/foodtypes/view/food/category/list/', FoodTypes.ViewsAllFoodTypes)



module.exports = router