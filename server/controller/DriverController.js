const OrderModel = require('../model/Order')
const DriverModel = require('../model/DriverModel')
const Object = require('mongoose').Types.ObjectId
const schedule = require('node-schedule')


// check in how many order is not processing
// GET 
exports.checkinNotProceesing = async (req, res) => {


    try {

        const order = await OrderModel.find({ OrderStatus: 'processing' })
            .select('-paymentMethod -client -discountCode -itemsPrics')

            .populate({
                path: 'orderitems.product',
                select: '_id name info'

            })
        if (order) {

            return res.status(202).json({
                length: order.length,
                data: order
            })
        }

        return res.status(404).json({ message: 'just now  not....' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



// take driver order 
// put 
exports.TakeOrder = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `it is not a id ${req.params.id}` })
    try {


        let order = await OrderModel.findById({ _id: req.params.id })

        if (order) {
            order.OrderStatus = 'your order on the way'
            order.drivertake = req.user._id
            let newSave = await order.save()


            DriverOder(newSave, req.user._id)
            // after on hour deliver...
            let mJob = schedule.scheduleJob('*0 */1 * * *', function () {
                AfteranHour(newSave)
                mJob.cancel()
            })

            return res.json({ message: 'Update Order' })


        }

        return res.status(404).json({ message: 'order is not here...' })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// delivery order....
const AfteranHour = async (data) => {

    try {
        let order = await OrderModel.findById({ _id: data._id })
        if (order) {

            order.OrderStatus = 'delivered'
            order.isDelivered = 'true'
            let newSave = await order.save()
            return console.log(newSave)

        } else {

        }
    } catch (error) {


        return console.log(error)

    }


}



// create driver order 
const DriverOder = async (data, driveruser) => {


    try {

        let newDriver = await new DriverModel({
            user: driveruser,
            order: data._id
        })

        await newDriver.save()
    } catch (error) {

        return console.log(error)
    }

}



// check in och your order on the way 
exports.checkinTheWay = async (req, res) => {

    try {
        let order = await OrderModel.find({ OrderStatus: 'your order on the way', drivertake: req.user._id })
        if (order) {

            return res.json(order)
        } else {

            return res.status(404).json('not')
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}




// cancal deliver change .....
exports.concalcaltion = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: `it is id valid ${req.params.id}`
    })

    try {

        let order = await OrderModel.findById({ _id: req.params.id })

        if (order.drivertake.toString() === req.user._id.toString()) {

            order.isDelivered = 'false'
            order.OrderStatus = "processing"
            order.drivertake.id = '123456789012345678901234'
            let newSave = await order.save()


            let deiver = await DriverModel.deleteOne({ order: newSave._id, user: req.user._id })
            if (deiver) {
                return res.json({ message: 'Remove....' })

            } else {

                return res.status(404).json({
                    message: 'we dont have some order id....'
                })
            }

        } else {

            return res.status(202).json({
                message: 'we dont have _id'
            })

        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// views all orders to driver
exports.ViewsAllDriversOrder = async (req, res) => {


    try {
        let driver = await DriverModel.find({ user: req.user._id })
            .populate({
                path: 'order',
                select: '_id driverPric isDelivered shippingAdress.yourAddress shippingAdress.zipCode',
                populate: { path: 'orderitems.product', select: '_id info name' }
            })

            .populate({ path: 'user', select: '_id username email' })
        if (driver) {

            return res.json(driver)
        } else {

            return res.json('not driver ...')
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



exports.testingConfirmOrder = async (req, res) => {


    try {
        let driver = await DriverModel.find({ user: req.user._id })
            .populate({
                path: 'order',
                // select: '_id driverPric   isDelivered shippingAdress.yourAddress shippingAdress.zipCode OrderStatus orderitems',
                populate: [
                    { path: 'orderitems.product', select: '_id name' }, { path: 'cartinfo', select: '_id username' }
                ]
                // populate: {  }
            })

            .populate({ path: 'user', select: '_id username email' })
        if (driver) return res.status(404).json(driver)

        return res.status(404).json({ message: 'not....' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// user Deliver order 
exports.DeliverOrder = async (req, res) => {
    try {

        let driver = await DriverModel.find({ user: req.user._id, })
            .populate({
                path: 'order',
                // select: '_id driverPrice   isDelivered shippingAdress.yourAddress shippingAdress.zipCode OrderStatus',
                populate: [
                    { path: 'cartinfo', select: '_id username location addressinfo' }
                ]

            })
        const FilterSatatusDelivery = driver.filter((x) => x.order.OrderStatus === 'delivery')


        if (FilterSatatusDelivery.length === Number(0)) {

            return res.status(200).json('Emty')
        }

        return res.status(200).json(FilterSatatusDelivery)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



// other driver// 
// OrderModel  -- drivertake

exports.OrderDriver = async (req, res) => {

    const pageSize = Number(5)
    const page = Number(req.query.pageNumber) || 1
    let count = await OrderModel.count(
        {

            drivertake: req.user._id,
            OrderStatus: 'delivery'
        })
    const result = {}
    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }



    try {
        let order = await OrderModel.find({
            drivertake: req.user._id,
            OrderStatus: 'delivery'
        }).select('orderTime shippingAdress driverPrice OrderStatus')
            .populate({ path: 'cartinfo', select: '_id location addressinfo username' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))


        if (order) return res.status(200).json({
            LengthProduct: count,
            result,
            pageNumber: page,
            pages: Math.ceil(count / pageSize),
            data: order,

        })

        return res.status(200).json('Empty.....')
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}
