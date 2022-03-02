const mongoose = require('mongoose')


const DriverSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

}, {
    timestamps: true,
})





module.exports = mongoose.model('Driver', DriverSchema)