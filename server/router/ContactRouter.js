const router = require('express').Router()
const ContactController = require('../controller/Contact_Controller')
const Admin = require('../Jwt/isAdmin')
const verify = require('../Jwt/Verfiy')



// view all availbel contcat 
// GET 
router.get('/contcat/available/', ContactController.AvailableContact)

// create new contcat 
// POST  Only Admin .
router.post('/contcat/create/', verify, Admin, ContactController.createNewContact)


// delete contcat 
router.delete('/contcat/delete/:id/', verify, Admin, ContactController.DeleteContact)


// Update post contcat 
// PUT 
router.put('/contcat/update/:id/', verify, Admin, ContactController.UpdateContact)

module.exports = router



