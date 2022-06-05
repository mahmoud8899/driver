const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    orderTime: {
        time: { type: String },
        today: { type: String },
    },
    orderitems: [
        {
            qty: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAdress: {


        firstname: { type: String,  },
        lastname: { type: String,  },
        yourEmail: { type: String,  },
        homeNumber: { type: String, },
        yourAddress: { type: String,  },
        city: { type: String,  },
        zipCode: { type: String,  },
        telephone: { type: String, },
    },


    paymentMethod: {
        type: String,
        required: true
    },
    itemsPrices: {
        type: Number,
        required: true,
        default: 0.0
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    ispaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    OrderStatus: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true,
    },
    driverPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    client: {
        type: String,
    },

    discountCode: {
        type: String,
    },

    drivertake: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cartinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartinfo',
        required: true
    },
    areportcancel: {
        whois: { type: String, },
        why: { type: String, },
        date: { type: Date }
    }

}, {
    timestamps: true
})





module.exports = mongoose.model('Order', OrderSchema)