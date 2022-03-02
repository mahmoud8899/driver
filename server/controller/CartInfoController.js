const CartInfoModel = require('../model/CartInfoModel')
const Object = require('mongoose').Types.ObjectId
const fs = require('fs')
// Create new restarange...
// POST   
exports.CreateNewRes = async (req, res) => {
    const {
        username,
        image,
        opentime,
        addressinfo,
        description,
        finishfood,
        productType,
        foodType
    } = req.body

    if (username.startsWith(" ") || username.endsWith(" ")) return res.status(404).json({ message: 'remove ' })

    try {


        let cartitems = await CartInfoModel.findOne({ username })
        if (!cartitems) {

            let cartitems = new CartInfoModel({
                user: req.user._id,
                username,
                image,
                opentime,
                addressinfo,
                description,
                finishfood,
                productType,
                foodType
            })

            const newSave = await cartitems.save()

            return res.status(201).json(newSave)
        }

        return res.status(200).json({
            message: 'we have some name...'
        })
    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}


// cart info id
// get
exports.CartInfoIDUser = async (req, res) => {
    try {
        let cartitems = await CartInfoModel.findOne({ _id: req.params.id })

        if (cartitems) {
            return res.status(200).json(cartitems)
        }


        else return res.status(404).json('not')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// views all restarange // rating max 8
// GET 
exports.ShowsAll = async (req, res) => {
    try {
        let cartitems = await CartInfoModel.find(
            {
                "addressinfo.city": req.params.city,
                productType: req.params.productType,
                firDlevery: false

            }).populate({ path: 'foodType', select: '_id foodType' })
        if (cartitems) {

            return res.status(200).json(cartitems)


            return
        }


        else return res.status(404).json('not')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// cartinfo id
// testing requires  styles .
// // /setTimeout(() => {
//     res.status(200).json(cartinfo)
// }, 5000);
exports.CartinfoId = async (req, res) => {
    try {

        let cartinfo = await CartInfoModel.findOne({ username: req.params.username })


        if (cartinfo) return res.status(200).json(cartinfo)


        return res.status(200).json({ message: 'we have not cart info id.' })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}






// Product Rating. from user....
// POST
exports.CartInfoAddComment = async (req, res) => {

    if (!Object.isValid(req.params.id) && !Object.isValid(req.body.firstname))
        return res.status(404).json({ message: `not id ${req.params.id}` })

    const { rating } = req.body

    try {
        let cartinfo = await CartInfoModel.findById({ _id: req.params.id })
        if (cartinfo) {

            const alreadyReviewed = cartinfo.comment.find((x) => x.user._id.toString() === req.user._id.toString())

            if (alreadyReviewed) return res.status(404).json({ message: 'I cannot comment again, the comment can be deleted or modified' })

            const FromUserComment = {
                user: req.user._id,
                rating,
                date: Date.now()
            }
            cartinfo.comment.push(FromUserComment)

            cartinfo.numReviews = cartinfo.comment.length

            cartinfo.rating =
                cartinfo.comment.reduce((acc, item) => item.rating + acc, 0) /
                cartinfo.comment.length


            await cartinfo.save()
            return res.status(201).json({
                message: 'Review Added'
            })


        } return res.status(404).json({ message: 'We don t have the same ID' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }


}





// cart info all fri leverans 
// GET 
exports.FreeDlevery = async (req, res) => {
    try {
        let newCart = await CartInfoModel.find({ freeDelvery: true })
        if (newCart) return res.status(200).json(newCart)

        return res.status(200).json('not')
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// new restranges
// max 8
// get 
//.sort({ createdAt: -1 }).limit(3)
exports.NewRestranges = async (req, res) => {
    try {
        let newcart = await CartInfoModel.find(
            {
                "addressinfo.city": req.params.city,
                productType: req.params.productType
            }
        ).sort({ createdAt: -1 }).limit(8)
        if (newcart) return res.status(200).json(newcart)
        return res.status(200).json('not')
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}





// filter restrange with category
// get //
exports.FilterRestranges = async (req, res) => {
    try {
        let newCart = await CartInfoModel.find(
            {
                "addressinfo.city": req.params.city,
                productType: req.params.productType,
            })
            .populate({ path: 'foodType', select: '_id foodType' })



        if (newCart) return res.status(200).json(newCart)
        return res.status(200).json('not')

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// update CartInfo 
// PUT 
exports.UpdateCartInfo = async (req, res) => {


    if (!Object.isValid(req.params.id)) return res.status(404).json('id....')
    try {
        let cartupdate = await CartInfoModel.updateOne({ _id: req.params.id })

        if (req.body.image?.toString() !== cartupdate.image?.toString()) {
            const Slicet = cartupdate.image?.slice(1)
            RemoveImage(Slicet)
            await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
            return res.status(201).json('Updated.....')

        } else {

            await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
            return res.status(201).json('Updated..... not Image')

        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




const RemoveImage = (Slicet) => {

    try {
        fs.unlinkSync(Slicet)
        return
    } catch (error) {
        return
    }


}




// if (req.file) {

//     if (req.file.filename.toString() !== cartupdate.image.toString()) {
//         const Slicet = cartupdate.image.slice(1)

//             console.log(cartupdate.image)
//             console.log(`/uploads/${req.file.filename}`)
//             const UploadingData = {
//                 image: `/uploads/${req.file.filename}`,
//                 username: req.body.username ? req.body.username : cartupdate.username,
//                 opentime: req.body.opentime ? req.body.opentime : cartupdate.opentime,
//                 addressinfo: req.body.addressinfo ? req.body.addressinfo : cartupdate.addressinfo,
//                 description: req.body.description ? req.body.description : cartupdate.description,
//                 finishfood: req.body.finishfood ? req.body.finishfood : cartupdate.finishfood,
//                 productType: req.body.productType ? req.body.productType : cartupdate.productType,
//                 foodType: req.body.foodType ? req.body.foodType : cartupdate.foodType,
//                 freeDelvery :  req.body.freeDelvery ? req.body.freeDelvery : cartupdate.freeDelvery,
//                 restrangeDriver :  req.body.restrangeDriver ? req.body.restrangeDriver : cartupdate.restrangeDriver,
//             }

//         RemoveImage(Slicet)
//         let newUpdated = await CartInfoModel.updateOne({ _id: req.params.id }, { $set: UploadingData})

//         return res.status(201).json(newUpdated)

//     } else {
//         let noPicture = await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
//         return res.status(201).json(noPicture)
//     }
// }

// let thenoPicture = await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
// return res.status(201).json(thenoPicture)




        // if (cartupdate.image?.length === 0) {
        //     let createCartUpdated = await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
        //     return res.status(201).json(createCartUpdated)

        // } else if (req.file) {

        //     const Slicet = cartupdate.image.slice(1)
        //     // return res.status(200).json(Slicet)
        //     // "/uploads/image-1646124395919.jpg"

        //     RemoveImage(Slicet)

        //     let newUpdated = await CartInfoModel.updateOne({ _id: req.params.id }, { $set: req.body })
        //     return res.status(201).json(newUpdated)

        // } else {
        //
        //
        // }
