const { uploadImageToCloudinary } = require('../utils/cloudinary');
const AdminQR = require('../models/AdminQR');

exports.uploadQR = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await uploadImageToCloudinary(req.file.path, 'qr_codes');
    const qr = new AdminQR({
      qrType: req.body.qrType,
      imageUrl: result.secure_url,
      uploadedBy: req.user._id   // Assuming admin auth
    });
    await qr.save();
    res.status(201).json(qr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQR = async (req, res) => {
  const qr = await AdminQR.findOne().sort({ uploadedAt: -1 }); // Latest
  if (!qr) return res.status(404).json({ error: 'QR not found' });
  res.json(qr);
};