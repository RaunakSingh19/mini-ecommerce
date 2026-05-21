const express = require('express');
const router = express.Router();
const adminQRController = require('../controllers/adminQRController');
const upload = require('../middleware/multer'); // Multer config

// Admin-only endpoint
router.post('/upload', upload.single('qr'), adminQRController.uploadQR);
router.get('/', adminQRController.getQR);

module.exports = router;