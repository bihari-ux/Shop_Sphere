const multer = require("multer");
const fs = require("fs");
const path = require("path");

function createUploader(folder){
    const dest = path.join("public", "uploads", folder);
    
    // Automatically create the directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, dest)
        },
        filename: function (req, file, cb){
            cb(null, Date.now() + file.originalname)
        }
    })

    return multer ({storage : storage})
}

module.exports = {
    maincategoryUploader: createUploader("maincategory"),
    subcategoryUploader: createUploader("subcategory"),
    brandUploader: createUploader("brand"),
    testimonialUploader: createUploader("testimonial"),
    productUploader: createUploader("product"),
    userUploader: createUploader("user")
}