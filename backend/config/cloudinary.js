const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
// This will use the values loaded by dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate that credentials are loaded
if (!process.env.CLOUDINARY_API_KEY) {
  console.warn('⚠️ Warning: CLOUDINARY_API_KEY not found in environment variables');
}

module.exports = cloudinary;