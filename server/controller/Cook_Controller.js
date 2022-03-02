const CookModel = require('../model/CookMode')
const Object = require('mongoose').Types.ObjectId



// View all available cook now
exports.AvailableCook = async (req, res) => {


    try {
        let cook = await CookModel.find({})
        .populate({path : 'user', select : '_id username'})
        if (cook) return res.status(200).json(cook)
        return res.status(200).json({
            message: `we do not have available cook`
        })
    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}


// create new cook 
exports.createNewCook = async (req, res) => {

    const { username,description ,image  } = req.body

    try {
        let cook = new CookModel({
            user: req.user._id,
            username,
            description,
            image

        })


        const newSaveCook = await cook.save()



        return res.status(201).json({
            message: 'Successfuly',
            newSaveCook
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }



}



// update post cook 
// PUT  
exports.UpdateCook = async (req, res) => {
    if (!Object.isValid) return res.json({
        message: `id is not valid ${req.params.id}`
    })
    const { username,description, image } = req.body
    try {

        let cook = await CookModel.updateOne({
            _id: req.params.id
        }, {
            username,description ,image
        })


        return res.status(201).json(cook)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// Delet Post Cook 
// Delete 
exports.DeleteCook = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: ` id is Valid ${req.params.id}`
    })
    try {
        let cook = await CookModel.deleteOne({ _id: req.params.id })

        if (cook) return res.status(200).json({ message: 'Remove post cook' })


        return res.status(200).json({ message: 'We do not have some cook' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}