const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function createUploader(folder) {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `ShopSphere/${folder}`,
            allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
            // Ensure original filename is preserved somewhat
            public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`
        },
    });

    return multer({ storage: storage });
}

module.exports = {
    maincategoryUploader: createUploader("maincategory"),
    subcategoryUploader: createUploader("subcategory"),
    brandUploader: createUploader("brand"),
    testimonialUploader: createUploader("testimonial"),
    productUploader: createUploader("product"),
    userUploader: createUploader("user")
};