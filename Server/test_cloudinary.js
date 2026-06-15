require("dotenv").config({ path: "e:/ShopSphere/Server/.env" });
let useCloudinary = false;
let CloudinaryStorage, cloudinary;

try {
    CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage;
    cloudinary = require("cloudinary").v2;

    console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
    console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET);

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        useCloudinary = true;
        console.log("Cloudinary configured successfully.");
    } else {
        console.log("Missing Cloudinary env variables.");
    }
} catch (error) {
    console.log("Error:", error);
}
console.log("useCloudinary:", useCloudinary);
