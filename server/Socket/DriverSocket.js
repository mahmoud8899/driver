const OrderModel = require('../model/Order')
const schedule = require('node-schedule')
const DriverModel = require('../model/DriverModel')


const CheckInOrder = async () => {


    try {
        let order = await OrderModel.find({ OrderStatus: 'processing' })
            .select('-paymentMethod -client -discountCode -itemsPrics')
            .populate({
                path: 'orderitems.product',
                select: '_id name info'

            })
        if (order) {

            return { order }
        } else {

            return ['we dont have availbol orders']
        }


    } catch (error) {

        return { 'error': error }
    }

}


// take driver order 
// put 
const TakeOrder = async (orderid, userid) => {


    try {


        let order = await OrderModel.findById({ _id: orderid })

        if (order) {
            order.OrderStatus = 'your order on the way'
            order.drivertake = userid
         
            let newSave = await order.save()

            // driver order... 
            DriverOder(newSave, userid)
            // after on hour deliver...
            let mJob = schedule.scheduleJob('*0 */1 * * *', function () {
                AfteranHour(newSave)
                mJob.cancel()
            })

            return ['Update Order']


        }

        return ['we dont have order id']

    } catch (error) {

        return { 'error': error }
    }
}


// delivery order....
const AfteranHour = async (data) => {

    try {
        let order = await OrderModel.findById({ _id: data._id })
        if (order) {

            order.OrderStatus = 'delivered'
            order.isDelivered = 'true'
            await order.save()


        } else {

        }
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

        await newDriver.save()
    } catch (error) {

        return console.log(error)
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

            return {order}
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





module.exports = {
    CheckInOrder,
    TakeOrder,
    ViewsAllDriversOrder,
    CheckInTheWay,
    Concalcaltion,
}