const WorkModel = require('../model/WorkModel')
const Object = require('mongoose').Types.ObjectId



// View all available work now
// error loading testing
exports.AvailableWork = async (req, res) => {


    try {
        let work = await WorkModel.find({})
        .populate({path : 'user', select : '_id username'})
        if (work) return res.status(200).json(work)
        return res.status(200).json({
            message: `we do not have available work`
        })
    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}








// create new Work 
exports.createNewWork = async (req, res) => {

    const { name, city, discription, email, Telephone, lasttime, } = req.body

    try {
        let createWork = new WorkModel({
            user: req.user._id,
            name,
            city,
            discription,
            email,
            Telephone,
            lasttime,

        })


        const newSaveWork = await createWork.save()



        return res.status(201).json({
            message: 'Successfuly',
            newSaveWork
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }



}



// update post work 
// PUT  
exports.UpdateWork = async (req, res) => {
    if (!Object.isValid) return res.json({
        message: `id is not valid ${req.params.id}`
    })
    const { name, city, discription, email, Telephone, lasttime, } = req.body
    try {

        let work = await WorkModel.updateOne({
            _id: req.params.id
        }, {
            name, city, discription, email, Telephone, lasttime
        })


        return res.status(201).json(work)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// Delet Post Work 
// Delete 
exports.DeleteWork = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: ` id is Valid ${req.params.id}`
    })
    try {
        let work = await WorkModel.deleteOne({ _id: req.params.id })

        if (work) return res.status(200).json({ message: 'Remove post Work' })


        return res.status(200).json({ message: 'We do not have some post' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}