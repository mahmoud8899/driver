const mongoose = require('mongoose')



const AuthSchema = mongoose.Schema({

    firstname: { type: String,  },
    lastname: { type: String,  },

    email: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    imageUrl: { type: String },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    telephone: { type: Number,  },
    Adress: {

        addres: { type: String },
        city: { type: String },
        zipcode: { type: String },
        work: { type: String },
        homeNumber: { type: String },

    },



    driverlogin: {
        type: Boolean,
        required: true,
        default: false,
    },

    likeforget: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    }
)







module.exports = mongoose.model('User', AuthSchema)