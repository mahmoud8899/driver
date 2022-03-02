const router = require('express').Router()
const FoodTypes = require('../controller/FoodTypeController')



// create food type
router.post('/foodtypes/create/', FoodTypes.CreateFoodTypes)

// views all food type
router.get('/foodtypes/view/food/category/list/', FoodTypes.ViewsAllFoodTypes)



module.exports = router