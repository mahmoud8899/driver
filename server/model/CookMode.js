const mongoose = require('mongoose')


const CookSchema = mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        type: String
    }
}, {
    timestamps: true,
})




module.exports = mongoose.model('cook', CookSchema)