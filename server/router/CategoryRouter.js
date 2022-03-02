const router = require('express').Router()

const ControllerCategory = require('../controller/Category_Controller')
const Admin = require('../Jwt/isAdmin')
const verify = require('../Jwt/Verfiy')
const multer = require('multer');

const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})





// get all category... 
router.get('/category/restrange/list/:cartinfo/', ControllerCategory.GetallCategory)


// create... 
router.post('/category/create/', ControllerCategory.createGategory
)

// delete
router.delete('/category/:id/', ControllerCategory.deleteCategory)


// update...
router.put('/category/:id/', ControllerCategory.Updateingcategory)











module.exports = router