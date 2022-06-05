const Category = require('../model/Category')
const Object = require('mongoose').Types.ObjectId


// create Category ... 
// POST
exports.CreateGategory = async (req, res) => {
    if (!Object.isValid(req.body.cartinfo)) return res.status(404).json({ message: 'id is valid...' })
    const { name, cartinfo } = req.body
    try {

        let newCheckCategory = await Category.findOne({ name: name.trim(), cartinfo: cartinfo })
        if (newCheckCategory) return res.status(404).json({ message: 'Du kan inte göra samma namn' })



        let category = new Category({
            name,
            cartinfo,
            user: req.user._id
        })

        const saveCategory = await category.save()
        return res.status(201).json({
            message: 'create new Category',
            saveCategory
        })





    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



//  All Category...
// GET to restrant
exports.FatchcategoryUser = async (req, res) => {
    try {

        let theCategory = await Category.find({ user: req.user._id })
        if (theCategory.length > 0) return res.status(200).json(theCategory)

        return res.status(200).json('Empty')
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



//  All Category...
// GET // testing loading error this is okej from client...
exports.GetallCategory = async (req, res) => {
    try {

        let theCategory = await Category.find({ cartinfo: req.params.cartinfo })
        if (theCategory) return res.status(200).json(theCategory)
        return res.status(404).json('not category not.....')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// delete Category ... 
exports.deleteCategory = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: 'id is valid...' })

    try {
        let categoryRemove = await Category.deleteOne({ _id: req.params.id })



        if (categoryRemove) return res.status(201).json({ message: 'Remove Category...' })


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
// PUT 
exports.Updateingcategory = async (req, res) => {
    if (!Object.isValid(req.body.cartinfo)) return res.status(404).json({ message: 'id is valid...' })
    const { name, cartinfo } = req.body
    try {

        let newCheckCategory = await Category.findOne({ name: name.trim(), cartinfo: cartinfo })
        if (newCheckCategory) return res.status(404).json({ message: 'Du kan inte göra samma namn' })

        let category = await Category.updateOne({ _id: req.params.id }, { $set: req.body })

        if (category) return res.status(201).json({ message: 'Updated Category' })

        return res.status(404).json('not update.....')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




exports.testcategoryall = async (req, res) => {

    try {

        let caategory = await Category.find({})

        return res.status(200).json(caategory)

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}
