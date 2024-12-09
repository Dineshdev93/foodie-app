const multer = require('multer')
// storage images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const filename = `image-${Date.now()}.${file.originalname}`
        cb(null, filename)
    }
})
//  file filter 
const filefilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    }
    else {
        cb(null, false)
        return (cb(new Error('Only png,jpg or jpeg images allowed')))
    }
}
const userUploads = multer({
    storage: storage,
    fileFilter: filefilter
})

module.exports = userUploads;