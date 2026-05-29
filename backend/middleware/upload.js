const multer = require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

// Verify Cloudinary is configured
if (!cloudinary.config().cloud_name) {
  console.error('❌ Cloudinary not properly configured. Check .env file for CLOUDINARY_* variables');
}

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder: "mini-ecommerce",

      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "webp",
      ],
    },  
  });

const upload = multer({
  storage,
});

module.exports = upload;