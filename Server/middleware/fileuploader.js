require("dotenv").config();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

let useCloudinary = false;
let CloudinaryStorage, cloudinary;

try {
    CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage;
    cloudinary = require("cloudinary").v2;

    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME.trim() : null;
    const api_key = process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.trim() : null;
    const api_secret = process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.trim() : null;

    if (cloud_name && api_key && api_secret) {
        cloudinary.config({
            cloud_name: cloud_name,
            api_key: api_key,
            api_secret: api_secret,
        });
        useCloudinary = true;
    }
} catch (error) {
    console.log("Cloudinary modules not found or configuration failed. Falling back to local disk storage.", error);
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