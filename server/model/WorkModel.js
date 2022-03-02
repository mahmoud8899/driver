const mongoose = require('mongoose')


const WorkSchema = mongoose.Schema({


    user : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User',
       required : true,
    },
    name: {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Telephone: {
        type: Number,
        required: true,
    },
    lasttime: {
        type: Date,
        required: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
})




module.exports = mongoose.model('Work', WorkSchema)