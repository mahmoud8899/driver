const mongoose = require('mongoose')

const CartInfoModelSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    username: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    opentime: {
        oppen: { type: String, required: true },
        close: { type: String, required: true },
    },
    addressinfo:
    {
        city: {
            type: String,
        },
        address: {
            type: String,
        },
        telefon: {
            type: Number,
        },
        website: {
            type: String,
        }
    },
    description: {
        type: String,
        required: true
    },

    comment: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: { type: Number, required: true },
            date: { type: Date, required: true }
        }
    ],

    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    finishfood: {
        to: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            required: true
        }
    },
    productType: {
        type: String,
        required: true
    },

    restrangeDriver: {
        type: Boolean,
        required: true,
        default: false
    },

    freeDelvery: {
        type: Boolean,
        required: true,
        default: false
    },

    foodType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodtype',
        required: true
    },


},
    {
        timestamps: true
    }
)






module.exports = mongoose.model('Cartinfo', CartInfoModelSchema)