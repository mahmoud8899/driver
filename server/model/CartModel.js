const mongoose = require('mongoose')



const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }
},
    {
        timestamps: true
    }
)






module.exports = mongoose.model('Cart', CartSchema)