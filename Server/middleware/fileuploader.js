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
        console.log("Cloudinary configured successfully.");
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

/**
 * Check if a given path is a Cloudinary URL
 */
function isCloudinaryUrl(picPath) {
    return typeof picPath === "string" && picPath.startsWith("http");
}

/**
 * Extract the Cloudinary public_id from a full Cloudinary URL
 * e.g. https://res.cloudinary.com/xxx/image/upload/v123/ShopSphere/product/abc.jpg
 * returns "ShopSphere/product/abc"
 */
function extractPublicId(url) {
    try {
        // Match everything after /upload/v<digits>/ and before the file extension
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

/**
 * Delete a file - handles both Cloudinary URLs and local file paths
 */
async function deleteFile(picPath) {
    if (!picPath) return;
    
    if (isCloudinaryUrl(picPath)) {
        // Delete from Cloudinary
        if (useCloudinary && cloudinary) {
            const publicId = extractPublicId(picPath);
            if (publicId) {
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.log("Cloudinary delete error:", error.message);
                }
            }
        }
    } else {
        // Delete from local filesystem
        try {
            fs.unlinkSync(picPath);
        } catch (error) {
            // File may not exist, ignore
        }
    }
}

module.exports = {
    maincategoryUploader: createUploader("maincategory"),
    subcategoryUploader: createUploader("subcategory"),
    brandUploader: createUploader("brand"),
    testimonialUploader: createUploader("testimonial"),
    productUploader: createUploader("product"),
    userUploader: createUploader("user"),
    deleteFile,
    isCloudinaryUrl,
    useCloudinary
};