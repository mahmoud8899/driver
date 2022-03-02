const router = require('express').Router()
const WorkController = require('../controller/Work_Controller')
const Admin = require('../Jwt/isAdmin')
const verify = require('../Jwt/Verfiy')



// view all availbel work 
// GET 
router.get('/work/available/', WorkController.AvailableWork)

// create new work 
// POST  Only Admin .
router.post('/work/create/', verify, Admin, WorkController.createNewWork)


// delete work 
router.delete('/work/delete/:id/', verify, Admin, WorkController.DeleteWork)


// Update post work 
// PUT 
router.put('/work/update/:id/', verify, Admin, WorkController.UpdateWork)

module.exports = router



//createNewWork