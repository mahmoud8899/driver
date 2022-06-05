const AuthController = require('../controller/Auth_Controller')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')




// post driver work
router.post('/user/work/', AuthController.DriverWork)

// user Change..
router.post('/user/change/:id/',   AuthController.changePassword)
router.put('/user/forgetpassword/', AuthController.forgetPassword)

// singUp
router.post('/user/create/', AuthController.singup)

// logo in...
router.post('/user/login/', AuthController.login)

// login with google
router.post('/user/singup/googl/', AuthController.GoogleLogin)


// put add telefon number
router.put('/user/telefonnumber/', verify, AuthController.AddTelefonNumber)

router.put('/user/change/driver/', verify, AuthController.driverChangeStatus)

// list user
router.get('/user/lists/', verify, Admin,AuthController.ListUser)


// user Info....
router.get('/user/user/', verify, AuthController.userId)

// user remove and IS Admin.....
router.put('/user/remove/user/', verify, Admin, AuthController.RemoveUserid)


// update adress..
router.put('/user/update/user/', verify, AuthController.UpdateAdress)

// remove user Adress.
router.put('/user/update/removeadress/', verify, AuthController.RemoveMyAdress)

// edit username 
router.put('/user/update/username/', verify, AuthController.ChangeUserName)

// checked user is 
// www.mahmoud.com/user/checkuser/
// GET 
router.post('/user/checkuser/', AuthController.CheckEdUser)
// add account bank
// put
router.put('/user/addcount/user/', verify, AuthController.AccountAdd)

module.exports = router