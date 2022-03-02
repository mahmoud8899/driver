const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    lastMessage: { type: String },
    message: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: { type: String },
            date: { type: Date },
        }
    ],
}, {
    timestamps: true
})



module.exports = mongoose.model('MessageChat', ChatSchema)