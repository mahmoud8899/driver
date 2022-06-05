const OrderModel = require('../model/Order')
const Object = require('mongoose').Types.ObjectId
const { main } = require('../Jwt/smtp')
// const { removeItemDiscount } = require('../controller/DiscountCodeController')
// const { CleaningCart } = require('./Cart_Controller')



// [1] send confirm to restrange
// [2] send confrim to user        |
//-----------------------------------




// orders restranges
// notifications max 10 order some last....
// testing...
exports.TheRestrangesOrders = async (req, res) => {


    try {
        let order = await OrderModel.find({ cartinfo: req.params.cartinfo, OrderStatus: 'processing' })
            .populate({ path: 'orderitems.product', select: '_id name prices' })
            .sort({ createdAt: -1 })
            .limit(4)

        if (order.length > 0) return res.status(200).json(order)




        return res.status(200).json('Empty')

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }


}









// create Order... 
// POST..... 
exports.CreateOrder = async (req, res) => {


    const { orderTime, orderitems, shippingAdress, paymentMethod, itemsPrices, driver, driverPrice, client, discountCode, cartinfo } = req.body
    try {

        let newOrder = new OrderModel({
            user: req.user._id,
            orderTime,
            orderitems,
            shippingAdress,
            paymentMethod,
            itemsPrices,
            OrderStatus: 'processing',
            driver,
            driverPrice,
            client,
            discountCode,
            cartinfo
        })


        const newSaveOrder = await newOrder.save()

        // send confirm email....
        // await main(newSaveOrder)
        return res.status(201).json(newSaveOrder)


    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}








// remove discount code.... 
// await removeItemDiscount(req, res, newOrderid.discountCode)
// if (client) {
//     let ClientOrder = await newOrder.save()
//     let newOrderid = await OrderModel.findById({ _id: ClientOrder._id })
//         .populate({ path: 'user', select: '_id username isAdmin' })
//         .populate({ path: 'orderitems.product', select: '_id image name prics' })

// status 200 ....
// return res.status(201).json({ message: 'Success Create Order', ClientOrder })

// }
// let order = await newOrder.save()
// await removeItemDiscount(req, res, order?.discountCode)
// await CleaningCart(req, res, order)




// show order id 
exports.ShowOrderId = async (req, res) => {


    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })


    try {
        let order = await OrderModel.findById({ _id: req.params.id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id image name prices' })

        if (order) return res.json(order)
        return res.status(404).json({ message: 'not have some order id ...' })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// show all order to  user...  
// View all requests to the user
exports.ordershowUserid = async (req, res) => {
    const pageSize = Number(5)
    const page = Number(req.query.pageNumber) || 1
    let count = await OrderModel.countDocuments({ user: req.user._id })
    const result = {}
    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }

    try {

        let order = await OrderModel.find({ user: req.user._id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id  name prices' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 })
        if (order) {


            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                orders: order,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }


}



// user remove order id ... 
exports.removeOrderId = async (req, res) => {

    try {
        let order = await OrderModel.findById({ _id: req.params.id })
        if (order && order.user.toString() === req.user._id.toString()) {
            let removeOrder = await OrderModel.deleteOne({ _id: req.params.id })
            return res.status(201).json({
                message: 'Remove Order Thank Your....',
                "success": removeOrder
            })
        } else {
            return res.json({ message: 'we do not have order id sorry...' })
        }
    } catch (error) {

    }
}




// admin change order to deliver Delivered
exports.Delivered = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {
        let order = await OrderModel.findById({ _id: req.params.id })
        if (order) {

            if (order.isDelivered) {
                order.isDelivered = false
                order.OrderStatus = 'processing'
                order.delivered = new Date()
                const saveOrder = await order.save()

                return res.status(201).json(saveOrder)
            } else {
                order.isDelivered = true
                order.delivered = new Date()
                order.OrderStatus = 'delivery'
                const saveOrderx = await order.save()

                return res.status(201).json(saveOrderx)
            }



        } else {
            return res.status(201).json({ message: `not have order .... ` })
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



//  search...
exports.AddSearch = async (req, res) => {
    const { search } = req.body

    try {
        let order = await OrderModel.find({ user: req.user._id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderItems.product', select: '_id image name prics' })

        if (order) {


            const xps = await OrderModel.find({ "orderItems.product.name": search })

            if (xps) {

                return res.status(200).json(xps)

            } else {
                return res.status(404).json('vo')
            }


        } else {
            return res.status(401).json('error')
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}





//View all orders -- Only Admin see 
// GET // /order/view/all/order/
exports.ViewAllOrders = async (req, res) => {

    if (!Object.isValid(req.params.cartinfo)) return res.status(404).json({ message: `not id ${req.params.id}` })


    const pageSize = Number(5)

    const page = Number(req.query.pageNumber) || 1

    let count = await OrderModel.countDocuments({ cartinfo: req.params.cartinfo })

    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }



    try {


        let order = await OrderModel.find({ cartinfo: req.params.cartinfo })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id image name prics' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (order) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: order,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }



}




// cancel order from User or restaurant
// private 
// PUT
exports.CancelOrder = async (req, res) => {
    if (!Object.isValid(req.params.id && req.user._id)) return res.status(404).json({ message: 'id' })
    try {



        let order = await OrderModel.findOne({ _id: req.params.id })

        if (order.user.toString() === req.user._id.toString() ||
            order.cartinfo.toString() === req.user.cartinfo.toString()
        ) {
            // check who is cancel order
            const theCheckCancel = order.user.toString() === req.user._id.toString() ? 'user' : 'restaurant'

            const theareportcancel = {
                whois: theCheckCancel,
                why: req.body.why,
                date: new Date()
            }
            const theCancel = 'cancel'

            order.OrderStatus = theCancel
            order.areportcancel = theareportcancel
            let newSaveCancel = await order.save()



            return res.status(201).json({
                message: 'successfully',
                newSaveCancel
            })

        } else {
            return res.status(404).json({
                message: 'no'
            })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



exports.TestOrder = async (req, res) => {
    try {

        let order = await OrderModel.find({ user: req.user._id })
        // .populate({ path: 'user', select: '_id username isAdmin' })
        // .populate({ path: 'orderItems.product', select: '_id image name prics' })
        return res.status(200).json(order)
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}






// test order //utkörning
exports.OrderTest = async (req, res) => {


    try {
        let order = await OrderModel.find({ OrderStatus: 'delivery', driver: 'utkörning' })

        if (order) return res.status(200).json(order)
        return res.status(404).json('empty')
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// check available order
exports.CheckOrderAvailble = async (req, res) => {
    try {
        let order = await OrderModel.findById({ _id: req.params.id })
        if (order.OrderStatus === 'processing') return res.status(200).json('processing')
        if (order.OrderStatus === 'confirm') return res.status(200).json('confirm')
        if (order.OrderStatus === 'your order on the way') return res.status(200).json('your order on the way')
        if (order.OrderStatus === 'delivery') return res.status(200).json('delivery')
        if (order.OrderStatus === 'cancel') return res.status(200).json('cancel')
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}