const mongoose = require('mongoose')



const AuthSchema = mongoose.Schema({

    firstname: { type: String, },
    lastname: { type: String, },

    email: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    imageUrl: { type: String },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    telephone: { type: String, },
    Adress: {

        addres: { type: String },
        city: { type: String },
        zipcode: { type: String },
        work: { type: String },
        homeNumber: { type: String },

    },

    restaurantid: {
        type: Boolean,
        required: true,
        default: false,
    },

    driverlogin: {
        type: Boolean,
        required: true,
        default: false,
    },

    driverStatus :{

     type : String,

    },

    likeforget: {
        type: String,
        default: ''
    },
    accountB: {
        accountnumber: { type: String, },
        accountnowner: { type: String, },
        iban: { type: String, }
    },
    cartinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartinfo',
    },
},
    {
        timestamps: true
    }
)







module.exports = mongoose.model('User', AuthSchema)