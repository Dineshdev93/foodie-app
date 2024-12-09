const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dygmowrh1",
    api_key: "367751565814888",
    api_secret: "kVlT3KD-3rQB0_8s3juq4lyU3L8"
})

module.exports = cloudinary;