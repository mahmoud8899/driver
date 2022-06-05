const OrderModel = require('../model/Order')



async function NewOrderSocket(Idrestaurant) {

    try {

        let order = await OrderModel.find({ cartinfo: Idrestaurant, OrderStatus: 'processing' })
            .populate({ path: 'orderitems.product', select: '_id name prices' })
            .sort({ createdAt: -1 })
            .limit(1)

        return { order }


    } catch (error) {

        return { 'error': error }
    }


}




module.exports = NewOrderSocket