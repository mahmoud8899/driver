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


exports.upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})



