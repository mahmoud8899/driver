const Category = require('../model/Category')



// create Category ... 
// POST
exports.createGategory = async (req, res) => {
    const { name, cartinfo } = req.body
    try {
        let category = new Category({
            name,
            cartinfo
        })

        const saveCategory = await category.save()
        return res.json(saveCategory)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

//  All Category...
// GET
exports.GetallCategory = async (req, res) => {

    // const { Restaurantname ,RestaurantCity} = req.body
    try {

        let theCategory = await Category.find({ cartinfo: req.params.cartinfo })
        if (theCategory) {
            return res.status(200).json(theCategory)
        }

        return res.status(200).json('not category not.....')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// delete Category ... 
exports.deleteCategory = async (req, res) => {


    try {
        let categoryRemove = await Category.findByIdAndDelete({ _id: req.params.id })



        if (categoryRemove) return res.json({ message: 'Remove Category...' })


        return res.status(404).json({
            message: 'we not have Category...'
        })



    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




// update category... 
exports.Updateingcategory = async (req, res) => {
    const { name, description } = req.body

    try {

        let category = await Category.updateOne({ _id: req.params.id }, { name, description })

        if (category) return res.json(category)

        return res.status(404).json('not update.....')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}









// let thecategory = await Category.find({ Cartinfo: req.params._id })
//     .populate({ path: 'cartinfo', select: 'username _id addressinfo' })
// const filterItmes = thecategory?.filter((u) => u?.cartinfo?.username === Restaurantname && u?.cartinfo?.addressinfo?.city === RestaurantCity)
// if (filterItmes.length >= 1) {
//     return res.status(200).json(filterItmes)
// }
// return res.status(200).json('no data')
// // return res.status(201).json('message')





// if (thecategory) {

//   const { search } = req.body

//     const xps = await Category.find({ 'cartinfo.username': 'uppsala food' })

//     if (xps) {

//         return res.status(200).json(xps)

//     } else {
//         return res.status(404).json('vo')
//     }

// }
// let category = await Category.find({})
//     .populate({ path: 'cartinfo', select: 'username _id' })

// // if (category) {
// //      let newCategory = await Category.find({"cartinfo._id"})

// //     if (newCategory) return res.status(201).json(newCategory)

// //     return res.json('no')


// // }

// if (category) return res.status(200).json(category)
// return res.status(201).json({ message: 'not category....' })


// const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
// const file = req.file
// let checkName = await Category.findOne({ name })
// if (checkName) {
//     return res.status(404).json({ message: 'we  have the same name' })
// } else {
//                 if (!file) return res.status(404).json({
//             message: 'not uploading Image...'
//         })
//         const fileName = file.filename;