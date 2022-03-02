const mongoose = require('mongoose')


const AboutSchema = mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    discription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   

}, {
    timestamps: true,
})



module.exports = mongoose.model('about', AboutSchema)