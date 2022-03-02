const AboutModel = require('../model/AboutModel')
const Object = require('mongoose').Types.ObjectId



// View all available work now
exports.AvailablAbout = async (req, res) => {


    try {
        let about = await AboutModel.find({})
        .populate({path : 'user', select : '_id username'})
        if (about) return res.status(200).json(about)
        return res.status(200).json({
            message: `we do not have available about`
        })
    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}








// create new Work 
exports.createNewAbout = async (req, res) => {

    const { discription ,image } = req.body

    try {
        let about = new AboutModel({
            user: req.user._id,
            discription,
            image

        })


        const newSaveAbout = await about.save()



        return res.status(201).json({
            message: 'Successfuly',
            newSaveAbout
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }



}



// update post work 
// PUT  
exports.UpdateAbout = async (req, res) => {
    if (!Object.isValid) return res.json({
        message: `id is not valid ${req.params.id}`
    })
    const { discription ,image  } = req.body
    try {

        let about = await AboutModel.updateOne({
            _id: req.params.id
        }, {
            discription ,image 
        })


        return res.status(201).json(about)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// Delet Post Work 
// Delete 
exports.DeleteAbout = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: ` id is Valid ${req.params.id}`
    })
    try {
        let about = await AboutModel.deleteOne({ _id: req.params.id })

        if (about) return res.status(200).json({ message: 'Remove post about' })


        return res.status(200).json({ message: 'We do not have some about' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}