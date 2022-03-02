const mongoose = require('mongoose')


const ProductSehema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,

    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number
    },
    image: {
        type: String,
        
    },
    prices: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    popular :{
        type: Boolean,
        required: true,
        default: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cartinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartinfo',
        required: true
    },
}, {
    timestamps: true,
})





module.exports = mongoose.model('Product', ProductSehema)