const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cartinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartinfo',
        required: true
    },
}, {
    timestamps: true,
})




module.exports = mongoose.model('Category', categorySchema);
