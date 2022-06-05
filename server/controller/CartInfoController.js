const CartInfoModel = require('../model/CartInfoModel')
const Object = require('mongoose').Types.ObjectId
const UpdateImage = require('./RemoveImage')
const UserModel = require('../model/AuthUser')


// restaurant id
exports.RestaurantID = async (req,res)=>{

    try{
        let cartinfo = await CartInfoModel.findById({_id : req.params.id})

        if(cartinfo) return res.status(200).json(cartinfo)

        return res.status(404).json({message : 'we dont have id'})
    }catch(error){

        return res.status(404).json({
            message : error.message
        })
         
    }
} 


// location: {
//     $nearSphere: {
//         $geometry: {
//             type: 'Point',
//             coordinates: [59.8623448,17.6240537]
//         },
//         $maxDistance: 10 * 1609.34
//     }
// }


// mpas location 
// testing.....
exports.LocationMpas = async (req, res) => {
    try {
        const cart = await CartInfoModel.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.params.lat, req.params.long]
                    },
                    $maxDistance: 10 * 1609.34
                }
            }
        })


        if (cart) return res.status(200).json(cart)
        // return res.status(200).json({ message: 'not matching', cart })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// filter restrange with category
// get //
exports.FilterRestranges = async (req, res) => {

    const keyword = req.query.keyword
        ? {
            username: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const pageSize = Number(5)
    const page = Number(req.query.pageNumber) || 1
    let count = await CartInfoModel.count(
        {
            ...keyword,
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.params.lat, req.params.long]
                    },
                    $maxDistance: 10 * 1609.34
                }
            },
        })
    const result = {}
    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }


    try {


        let cartitems = await CartInfoModel.find(
            {
                ...keyword,
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [req.params.lat, req.params.long]
                        },
                        $maxDistance: 10 * 1609.34
                    }
                },
            })
            .populate({ path: 'foodtype', select: '_id foodType' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))



        return res.status(200).json({
            LengthProduct: count,
            result,
            pageNumber: page,
            pages: Math.ceil(count / pageSize),
            data: cartitems, 
        })










    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// get cart info to user
// Private GET
exports.CartInfoIDUser = async (req, res) => {
    try {
        let cartitems = await CartInfoModel.findOne({ user: req.user._id })
            .populate({ path: 'foodtype', select: '_id foodType' })


        if (cartitems) return res.status(200).json(cartitems)
        return res.status(200).json('Empty')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// Create new restarange...
// Private POST
exports.CreateNewRes = async (req, res) => {
    const { username, image, opentime, addressinfo, description, finishfood, productType, foodtype, location } = req.body
    try {
        let cartitems = await CartInfoModel.findOne({ user: req.user._id })

        if (cartitems) return res.status(404).json({ message: 'not Create' })

        if (!cartitems) {

            let SomeName = await CartInfoModel.findOne({ username: username })
            if (SomeName) return res.status(404).json({ message: 'We Have some name' })
            let cartitems = new CartInfoModel({
                user: req.user._id,
                username,
                image,
                opentime,
                addressinfo,
                description,
                finishfood,
                productType,
                foodtype,
                location
            })

            const SaveCartInfo = await cartitems.save()
            // add user some _id 
            let usermodel = await UserModel.findOne({ _id: req.user._id })
            if (usermodel) {
                usermodel.cartinfo = SaveCartInfo._id
                await usermodel.save()
                return res.status(201).json({ message: 'successFully' })
            }


        }

    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}





// GET  /testing error loading
// pagation  
exports.ShowsAll = async (req, res) => {
    const pageSize = Number(6)
    const page = Number(req.query.pageNumber) || 1
    let count = await CartInfoModel.count({

        location: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [req.params.lat, req.params.long]
                },
                $maxDistance: 10 * 1609.34
            }
        },
        productType: req.params.productType
    })
    const result = {}
    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }

    try {


        let cartitems = await CartInfoModel.find({
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.params.lat, req.params.long]
                    },
                    $maxDistance: 10 * 1609.34
                }
            },
            productType: req.params.productType

        })
            .populate({ path: 'foodtype', select: '_id foodType' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))


        if (cartitems) {
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                data: cartitems,
            })
        }


        else return res.status(404).json('not')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// cartinfo username one page
// testing loading and error ...... 
exports.CartinfoId = async (req, res) => {
    try {

        let cartinfo = await CartInfoModel.findOne({ username: req.params.username })

        return res.status(200).json(cartinfo)

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





// cart info all free leverans 
// GET 
exports.FreeDlevery = async (req, res) => {
    // if (!Object.isValid(req.params.city)) return res.status(404).json({ message: 'id' })
    try {
        let newCart = await CartInfoModel.find(
            {
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [req.params.lat, req.params.long]
                        },
                        $maxDistance: 10 * 1609.34
                    }
                },
                freeDelvery: true
            },


        )
            .limit(7)


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
exports.BestRestrant = async (req, res) => {
    try {
        let newcart = await CartInfoModel.find(
            {
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [req.params.lat, req.params.long]
                        },
                        $maxDistance: 10 * 1609.34
                    }
                },
            }
        ).sort({ rating: -1 }).limit(6)

        if (newcart?.length >= 1) return res.status(200).json(newcart)

        return res.status(200).json(newcart)
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
        let cartupdate = await CartInfoModel.findOne({ _id: req.params.id })

        if (req.body.image?.toString() !== cartupdate.image?.toString()) {
            const Slicet = cartupdate.image?.slice(1)
            console.log('yes......', Slicet)
            UpdateImage.RemoveImage(Slicet)
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




// testing///
exports.Location = async (req, res) => {
    try {

        // const clientLong = req.body.long;
        // const clientLat = req.body.lat;
        // // const restaurantID = req.resID;
        // // const resData = await CartInfoModel.findById(restaurantID); // if you wantfor one
        // await CartInfoModel.find({location:})

    } catch (error) {
        console.log(error);
    }
}


// // filter category
// // get
// router.get('/cartinfo/restrang/:city/:productType/', CartInfoController.FilterRestranges)

// testing code
// setTimeout(()=>{
// },5000)
//testing 








    // if (username.startsWith(" ") || username.endsWith(" ")) return res.status(404).json({ message: 'remove ' })



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


        // testing code
// setTimeout(()=>{
// },5000)
//testing 
// exports.testingCart = async (req, res) => {
//     try {

//         const testing = await CartInfoModel.aggregate([
//             { $match: { username: 'testing usernamed' } },
//             { $project: { _id: 1, username: 1 } },
//             { $limit: 3 }
//             // { $match: { _id: 0, username: 'testing usernamed'} },
//             // { $limit : 3 }
//         ])

//         return res.status(200).json(testing)
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }

// testing code
// setTimeout(()=>{
// },5000)
//testing 
// exports.testingCart = async (req, res) => {
//     try {

//         const testing = await CartInfoModel.aggregate([
//             { $match: { username: 'testing usernamed' } },
//             { $project: { _id: 1, username: 1 } },
//             { $limit: 3 }
//             // { $match: { _id: 0, username: 'testing usernamed'} },
//             // { $limit : 3 }
//         ])

//         return res.status(200).json(testing)
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }

