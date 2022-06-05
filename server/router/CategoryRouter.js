const router = require('express').Router()
const ControllerCategory = require('../controller/Category_Controller')
const verify = require('../Jwt/Verfiy')






// Public
// get all category... 
router.get('/category/restrange/list/:cartinfo/', ControllerCategory.GetallCategory)



// test
router.get('/category/test/', ControllerCategory.testcategoryall)

// Private
// create... 
router.post('/category/create/', verify, ControllerCategory.CreateGategory)


// Private
// category user.
// GET
router.get('/category/create/user/', verify, ControllerCategory.FatchcategoryUser)

// Private
// delete
router.delete('/category/:id/', ControllerCategory.deleteCategory)

// Private
// update...
router.put('/category/:id/', ControllerCategory.Updateingcategory)


module.exports = router