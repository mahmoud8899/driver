const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
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






router.post(`/uploading/`, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

// image delete 
router.delete('/mahmoud/api/:id', function (req, res) {

   
  

    try {
        console.log(req.params.id)
        fs.unlinkSync(`uploads/${req.params.id}`)
        return res.status(200).json({message : 'Successfully! Image has been Deleted'});

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
})




module.exports = router






// router.post('/', upload.array('image', 12), async (req, res, next) => {
//     const Follow = await Promise.all(
//         req.files.map((fil) => {
//             return `/${fil.path}`
//         })
//     )
//     return res.json(Follow)
// })