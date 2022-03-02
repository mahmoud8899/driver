const mongoose = require('mongoose')


const ContactSchema = mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    username: { type: String },
    addres: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Telephone: {
        type: Number,
        required: true,
    }

}, {
    timestamps: true,
})



module.exports = mongoose.model('contact', ContactSchema)