const router = require('express').Router()
const CookController = require('../controller/Cook_Controller')
const Admin = require('../Jwt/isAdmin')
const verify = require('../Jwt/Verfiy')



// view all availbel cook 
// GET 
router.get('/cook/available/', CookController.AvailableCook)

// create new cook 
// POST  Only Admin .
router.post('/cook/create/', verify, Admin, CookController.createNewCook)


// delete cook 
router.delete('/cook/delete/:id/', verify, Admin, CookController.DeleteCook)


// Update post cook 
// PUT 
router.put('/cook/update/:id/', verify, Admin, CookController.UpdateCook)

module.exports = router



