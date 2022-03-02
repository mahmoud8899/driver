const ProductModel = require('../model/Product')
const Object = require('mongoose').Types.ObjectId
const schedule = require('node-schedule')







// All Products.
exports.RestaurantProductsFilter = async (req, res) => {


    const pageSize = Number(5)

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },

    } : {}
    const page = Number(req.query.pageNumber) || 1

    let count = await ProductModel.countDocuments({ cartinfo: req.params.id, ...keyword })


    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }

    try {

        let filterCategory = await ProductModel.find({ cartinfo: req.params.id, ...keyword })

            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (req.query.keyword.length === 0) {

            return res.status(200).json([])
        } else if (filterCategory) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: filterCategory,

            })


        }




        //  if (Math.ceil(count / pageSize) < page) return res.status(404).json({ message: 'Not more product..' })


        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }



}


// GET
// Cart info of products.....
exports.CartInDetailProducts = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id undefined ${req.params.id}` })

    const pageSize = Number(5)
    const page = Number(req.query.pageNumber) || 1

    let count = await ProductModel.countDocuments({ cartinfo: req.params.id })

    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }

    try {

        //  if (Math.ceil(count / pageSize) < page) return res.status(404).json({ message: 'Not more product..' })
        let filterCategory = await ProductModel.find({ cartinfo: req.params.id })
            .populate({ path: 'category', select: '_id name' })

            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (filterCategory) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: filterCategory,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }

}



// create  discount 
// POST
exports.discountPric = async (req, res, next) => {


    try {

        let product = await ProductModel.find({})

        if (product) {


            let productResult = await ProductModel.updateMany({ discount: req.body.discount })



            await res.json(productResult)
            let mJob = schedule.scheduleJob('*/10 * * * *', function () {
                myBack(req, res, next)
                mJob.cancel()
            })





        }

    } catch (error) {

        return console.log(error)
    }
}




// remove discoun after 2 days...
const myBack = async (req, res, next) => {



    //const discountNow = Number(0)


    await ProductModel.updateMany({ discount: Number(0) })

    console.log('remove')


}



// create product... 
// POST
exports.CreateProduct = async (req, res) => {
    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    const { name, image, prices, countInStock, description, category, cartinfo, popular } = req.body
    try {

        let product = await ProductModel.create({
            user: req.user._id,
            name, image, prices, countInStock, description, category, cartinfo, popular
        })

        const newProduct = await product.save()
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

}



// // views all product of cartinfo
// exports.CartInfoProducts = async (req,res)=>{
//     try{
//         let product = await ProductModel.find({cartinfo : req.params.id})
//         if(product.length >= 1) return res.status(200).json(product)
//         else res.status(201).json('not')
//     }catch(error){
//         return res.status(404).json({message : error.message})
//     }
// }

// get top product ///
// GET 
exports.getTopProduct = async (req, res) => {

    const product = await ProductModel.find({})
        .sort({ rating: - 1 }).limit(5)

    if (product) {
        return res.status(200).json(product)
    } else {

        return res.status(200).json({ message: 'We have not product som best..' })
    }

}



// new product  7 ... 
// GET
exports.newProduct = async (req, res) => {

    try {

        let product = await ProductModel.find({}).sort({ createdAt: - 1 }).limit(8)

        return res.status(200).json(product)
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// product id.. 
// GET
exports.productID = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {

        let productId = await ProductModel.findById({ _id: req.params.id })
            .populate({ path: 'cartinfo', select: '_id username addressinfo' })
        if (productId) return res.status(200).json(productId)
        else return res.status(404).json({ message: 'we do not have id' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




// count all product som have... 
// GET
exports.cuntAllProduct = async (req, res) => {

    let product = await ProductModel.countDocuments((cun) => cun)
    if (product) {
        return res.json(product)
    } else {

        return res.status(404).json({ message: 'not have product not' })
    }
}






// product delete...
// DELETE
exports.DeleteProduct = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {
        let product = await ProductModel.findById({ _id: req.params.id })
        if (product) {

            await product.remove()

            return res.status(201).json({
                message: 'Product Remove..'
            })
        } else {
            return res.status(201).json({ message: 'We don t have the same ID' })
        }

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}











// post Update 
exports.EditProduct = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: 'id' })
    try {

        let UpdateProduct = await ProductModel.updateOne({ _id: req.params.id }, { $set: req.body })

        if (UpdateProduct) return res.status(201).json(UpdateProduct)
        return res.status(404).json({ message: 'not.....' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}








// add comment Review
// POST
exports.AddComment = async (req, res) => {

    if (!Object.isValid(req.params.id) && !Object.isValid(req.body.firstname))
        return res.status(404).json({ message: `not id ${req.params.id}` })

    const { rating, usercomment } = req.body

    try {
        let product = await ProductModel.findById({ _id: req.params.id })
        if (product) {

            const alreadyReviewed = product.comment.find((x) => x.user._id.toString() === req.user._id.toString())

            if (alreadyReviewed) return res.status(404).json({ message: 'I cannot comment again, the comment can be deleted or modified' })

            const FromUserComment = {
                user: req.user._id,
                firstname: req.user.firstname,
                rating,
                usercomment,
                date: Date.now()
            }
            product.comment.push(FromUserComment)

            product.numReviews = product.comment.length

            product.rating =
                product.comment.reduce((acc, item) => item.rating + acc, 0) /
                product.comment.length


            await product.save()
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


// delete review from user..........>>>
// DELETE
exports.deleteComment = async (req, res) => {

    //  if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    try {

        let product = await ProductModel.findById({ _id: req.params.id })
        if (product) {

            const checkId = product.comment.filter((checkIn) => checkIn.user._id.toString() !== req.user._id.toString())


            if (checkId) {

                product.comment = checkId
                await product.save()
                return res.status(201).json({
                    message: 'remove.'
                })
            }
            else return res.status(404).json({
                message: 'You don t have a review unfortunately'
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



// Update comment and Review ... 
//  PUT
exports.UpdateCommentReview = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    const { rating, usercomment, } = req.body

    try {


        let product = await ProductModel.findById({ _id: req.params.id })


        if (product) {

            const checkUser = product.comment.find((obj) => obj.user._id.toString() === req.user._id.toString())
            if (checkUser) {

                checkUser.username = req.user.username
                checkUser.rating = Number(rating)
                checkUser.usercomment = usercomment
                checkUser.date = Date.now()
                product.numReviews = product.comment.length
                product.rating =
                    product.comment.reduce((acc, item) => item.rating + acc, 0) /
                    product.comment.length

                const newSaveUpdate = await product.save()
                return res.status(201).json(newSaveUpdate)

            }

            return res.json({ message: 'not....' })
        } else {

            return res.json('not produt')
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

