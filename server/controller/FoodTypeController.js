const FoodTypeModel = require('../model/FoodTypesModel')




// create food types 
// post 
exports.CreateFoodTypes = async (req, res) => {

    const { foodType ,image } = req.body

    if(foodType.startsWith(" ") ||  foodType.endsWith(" ")) return res.status(404).json({message : 'remove '})

    try {
        let newfood = await FoodTypeModel.findOne({ foodType })
        if (newfood) return res.status(404).json({ message: 'we have somme name' })

        newfood = new FoodTypeModel({
            foodType,
            image
       
        })
        let newSave = await newfood.save()

        return res.status(201).json(newSave)

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// views all food type 
// get 
exports.ViewsAllFoodTypes = async (req, res) => {
    try {
        let newfood = await FoodTypeModel.find()
        if (newfood) return res.status(200).json(newfood)
        return res.status(404).json({ message: 'we have not food types new.......' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}