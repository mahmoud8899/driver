const mongoose = require('mongoose')




const discountCodeSchema = mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },

    discountCode: {
        type: Array,
        default: []
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // required: true
    }
}, {
    timestamps: true,
})



module.exports = mongoose.model('DiscountCode', discountCodeSchema)
