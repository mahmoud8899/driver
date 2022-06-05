const OrderModel = require('../model/Order')
const schedule = require('node-schedule')
const DriverModel = require('../model/DriverModel')
const Auth = require('../model/AuthUser')

// check availb
// driver :'utkörning'
const CheckInOrder = async (pageNumber) => {
    const pageSize = Number(5)
    const page = Number(pageNumber) || 1
    let count = await OrderModel.count(
        {
            OrderStatus: 'processing'
        })
    const result = {}
    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }

    try {
        let order = await OrderModel.find({ OrderStatus: 'processing', })
            .select('-paymentMethod -client -discountCode -itemsPrics')
            .populate({
                path: 'orderitems.product',
                select: '_id name info'

            })
            .populate({
                path: 'cartinfo',
                select: '_id username addressinfo location'
            })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

        if (order) {

            return {
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                data: order,

            }
        } else {

            return ['we dont have availbol orders']
        }


    } catch (error) {

        return { 'error': error }
    }

}




// take driver order 
// put 
const TakeOrder = async (orderid, userid, changeStatus, createDriver) => {


    try {


        let order = await OrderModel.findById({ _id: orderid })

        if (order) {
            order.OrderStatus = changeStatus
            order.drivertake = userid

            let newSave = await order.save()
            // driver order... create one driver 
            createDriver && DriverOder(newSave, userid)
            driverChangeStatus(userid, changeStatus)
            return ['Update Order']


        }

        return ['we dont have order id']

    } catch (error) {

        return { 'error': error }
    }
}




// create driver order 
const DriverOder = async (data, userid) => {


    try {

        let newDriver = await new DriverModel({
            user: userid,
            order: data._id
        })

        console.log('create new order with driver')

        await newDriver.save()
    } catch (error) {

        return console.log(error)
    }

}


// // user change status
const driverChangeStatus = async (userId, changeStatus) => {
    try {
        await Auth.updateOne({ _id: userId }, { $set: { driverStatus: changeStatus } })

    } catch (error) {

        return {
            error: error.message
        }
    }
}


// views all orders to driver
const ViewsAllDriversOrder = async (userid) => {


    try {
        let driver = await DriverModel.find({ user: userid })
            .populate({
                path: 'order',
                select: '_id driverPric isDelivered shippingAdress.yourAddress shippingAdress.zipCode',
                populate: { path: 'orderitems.product', select: '_id info name' }
            })

            .populate({ path: 'user', select: '_id username email' })
        if (driver) {

            return { driver }
        } else {

            return ['not order...']
        }
    } catch (error) {

        return { 'error': error }
    }
}



// check in och your order on the way 
const CheckInTheWay = async (userId) => {

    try {
        let order = await OrderModel.find({ OrderStatus: 'your order on the way', drivertake: userId })
            .select('-paymentMethod -client -discountCode -itemsPrics')
            .populate({
                path: 'orderitems.product',
                select: '_id name info'

            })
        if (order) {

            return { order }
        } else {

            return ['error']
        }
    } catch (error) {

        return [error]
    }
}




// cancal deliver change .....
const Concalcaltion = async (dataid, userid) => {


    try {

        let order = await OrderModel.findById({ _id: dataid })

        if (order.drivertake.toString() === userid.toString()) {

            order.isDelivered = 'false'
            order.OrderStatus = "processing"
            order.drivertake.id = '123456789012345678901234'
            let newSave = await order.save()


            let deiver = await DriverModel.deleteOne({ order: newSave._id, user: userid })
            if (deiver) {
                return 'Remove Order'

            } else {

                return ['Your dont have permissions']
            }

        } else {

            return ['We dont have some _id']

        }
    } catch (error) {

        return [error]
    }
}



// order status to Driver
const ChangeOrderStatus = async (userId, Status) => {
    try {
        let driver = await DriverModel.find({ user: userId })
            .populate({
                path: 'order',
                // select: '_id driverPric   isDelivered shippingAdress.yourAddress shippingAdress.zipCode OrderStatus orderitems',
                populate: [
                    { path: 'orderitems.product', select: '_id name prices' },
                    { path: 'cartinfo', select: '_id username location addressinfo' }
                ]

            }).populate({ path: 'user', select: '_id username email' })

        const FilterSatatusDelivery = driver.filter((x) => x.order.OrderStatus === Status)

        //  console.log('in....', FilterSatatusDelivery)


        if (FilterSatatusDelivery.length === Number(0)) {

            return 'Empty'
        }

        return { FilterSatatusDelivery }







    } catch (error) {

        return {
            'message': error.message
        }
    }
}



// order checking is available
const OrderCheckingIsAvailable = async (orderId) => {
    try {
        let order = await OrderModel.findById({ _id: orderId })
        if (order.OrderStatus === 'processing') return 'processing'
        if (order.OrderStatus === 'confirm') return 'confirm'
        if (order.OrderStatus === 'your order on the way') 'your order on the way'
        if (order.OrderStatus === 'delivery') return 'delivery'
        if (order.OrderStatus === 'cancel') return 'cancel'
    } catch (error) {
        return { 'message': error.message }
    }
}


module.exports = {
    CheckInOrder,
    TakeOrder,
    ViewsAllDriversOrder,
    CheckInTheWay,
    Concalcaltion,
    ChangeOrderStatus,
    OrderCheckingIsAvailable

}






