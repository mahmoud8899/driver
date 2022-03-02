const ContactModel = require('../model/ContactModel')
const Object = require('mongoose').Types.ObjectId



// View all available work now
exports.AvailableContact = async (req, res) => {


    try {
        let contact = await ContactModel.find({})
        if (contact) return res.status(200).json(contact)
        return res.status(200).json({
            message: `we do not have available work`
        })
    } catch (error) {


        return res.status(404).json({
            message: error.message
        })
    }
}








// create new contact 
exports.createNewContact = async (req, res) => {

    const { username,  addres, city, zipCode, email, Telephone,} = req.body

    try {
        let contact = new ContactModel({ user : req.user._id, username, addres, city,zipCode, email, Telephone})
        const newContact = await contact.save()
        return res.status(201).json({
            message: 'Successfuly',
            newContact
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }



}



// update post work 
// PUT  
exports.UpdateContact = async (req, res) => {
    if (!Object.isValid) return res.json({
        message: `id is not valid ${req.params.id}`
    })
    const { username,  addres, city, zipCode, email, Telephone} = req.body
    try {

        let contact = await ContactModel.updateOne({
            _id: req.params.id
        }, {
            username,  addres, city, zipCode, email, Telephone
        })


        return res.status(201).json(contact)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// Delet Post Work 
// Delete 
exports.DeleteContact = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: ` id is Valid ${req.params.id}`
    })
    try {
        let contact = await ContactModel.deleteOne({ _id: req.params.id })

        if (contact) return res.status(200).json({ message: 'Remove post contact' })


        return res.status(200).json({ message: 'We do not have some contact' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}