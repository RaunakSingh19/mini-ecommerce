    const mongoose = require('mongoose');

const adminQRSchema = new mongoose.Schema({
  qrType: { type: String, enum: ['UPI', 'PhonePe', 'GooglePay', 'Paytm'] },
  imageUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminQR', adminQRSchema);