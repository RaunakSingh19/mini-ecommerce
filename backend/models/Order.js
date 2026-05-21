const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      size: String,
      color: String,
      variants: mongoose.Schema.Types.Mixed,
      subtotal: Number,
    }
  ],
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: String,
    email: String,
    address: { type: String, required: true },
    landmark: String,
    city: String,
    pincode: { type: String, required: true },
    notes: String,
  },
  paymentScreenshotUrl: { type: String, required: true },
  paymentMethod: { type: String, default: 'UPI QR' },
  paymentStatus: { type: String, default: 'PAID' },
  orderStatus: { type: String, default: 'PENDING', enum: ['PENDING', 'CONFIRMED', 'DELIVERED'] },
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);  