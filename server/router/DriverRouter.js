const router = require('express').Router()
const drivercontroller = require('../controller/DriverController')
const verify = require('../Jwt/Verfiy')
const isDriver = require('../Jwt/isDriver')



router.get('/driver/', drivercontroller.checkinNotProceesing)
router.put('/driver/change/:id/', verify, isDriver,drivercontroller.TakeOrder)
router.get('/driver/check/', verify, isDriver, drivercontroller.checkinTheWay)
router.get('/driver/view/orders/', verify,  drivercontroller.ViewsAllDriversOrder)
router.put('/driver/cencal/:id',verify, isDriver,drivercontroller.concalcaltion)


module.exports = router