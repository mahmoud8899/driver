const mongoose = require('mongoose')

const FoodTypesSchema = mongoose.Schema({

    foodType: {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)






module.exports = mongoose.model('foodtype', FoodTypesSchema)