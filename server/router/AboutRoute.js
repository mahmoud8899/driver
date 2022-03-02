const router = require('express').Router()
const AboutController = require('../controller/About_Controller')
const Admin = require('../Jwt/isAdmin')
const verify = require('../Jwt/Verfiy')



// view all availbel about 
// GET 
router.get('/about/available/', AboutController.AvailablAbout)

// create new about 
// POST  Only Admin .
router.post('/about/create/', verify, Admin, AboutController.createNewAbout)


// delete about 
router.delete('/about/delete/:id/', verify, Admin, AboutController.DeleteAbout)


// Update post about 
// PUT 
router.put('/about/update/:id/', verify, Admin, AboutController.UpdateAbout)

module.exports = router



