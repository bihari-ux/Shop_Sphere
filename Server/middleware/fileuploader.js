const multer = require("multer");
const fs = require("fs");
const path = require("path");

let useCloudinary = false;
let CloudinaryStorage, cloudinary;

try {
    CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage;
    cloudinary = require("cloudinary").v2;

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        useCloudinary = true;
    }
} catch (error) {
    console.log("Cloudinary modules not found or configuration failed. Falling back to local disk storage.");
}

function createUploader(folder) {
    if (useCloudinary) {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: `ShopSphere/${folder}`,
                allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"]
            },
        });
        return multer({ storage: storage });
    } else {
        const dest = path.join("public", "uploads", folder);
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, dest);
            },
            filename: function(req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        });
        return multer({ storage: storage });
    }
}

module.exports = {
    maincategoryUploader: createUploader("maincategory"),
    subcategoryUploader: createUploader("subcategory"),
    brandUploader: createUploader("brand"),
    testimonialUploader: createUploader("testimonial"),
    productUploader: createUploader("product"),
    userUploader: createUploader("user")
};