// // // // const mongoose = require("mongoose");

// // // // const productSchema = new mongoose.Schema(
// // // //   {
// // // //     title: {
// // // //       type: String,
// // // //       required: true,
// // // //       trim: true,
// // // //     },

// // // //     slug: {
// // // //       type: String,
// // // //       required: true,
// // // //       unique: true,
// // // //     },

// // // //     description: {
// // // //       type: String,
// // // //       required: true,
// // // //     },

// // // //     shortDescription: {
// // // //       type: String,
// // // //     },

// // // //     price: {
// // // //       type: Number,
// // // //       required: true,
// // // //     },

// // // //     images: [
// // // //       {
// // // //         type: String,
// // // //       },
// // // //     ],

// // // //     stock: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },

// // // //     isAvailable: {
// // // //       type: Boolean,
// // // //       default: true,
// // // //     },
// // // //     category: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "Category",
// // // //       required: true,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   }
// // // // );

// // // // module.exports =
// // // //   mongoose.models.Product ||
// // // //   mongoose.model("Product", productSchema);
// // // const mongoose = require('mongoose');

// // // const variantSchema = new mongoose.Schema(
// // //   {
// // //     // These keys cover general cases and allow custom options
// // //     name: String, // e.g. "Medium", "Blue", "Family Pack", "AC Room"
// // //     price: Number,
// // //     // Optionally, use options array for flexible further selection:
// // //     options: [{
// // //       key: String, // e.g. "portion", "sugar", "topping"
// // //       value: String,
// // //     }],
// // //     // Or, you can add fields: size, color etc., if needed
// // //   },
// // //   { _id: false }
// // // );

// // // const productSchema = new mongoose.Schema({
// // //   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
// // //   title: String,
// // //   description: String,
// // //   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
// // //   type: { type: String, enum: ['food', 'apparel', 'electronics', 'service'], required: true },
// // //   images: [String],
// // //   isActive: { type: Boolean, default: true }, // ADMIN TOGGLE AVAILABILITY
// // //   variants: [variantSchema], // Holds ALL variant choices for this product
// // //   // Optionally add: tags, meta, etc.
// // // }, { timestamps: true });

// // // module.exports = mongoose.model('Product', productSchema);    










// // const mongoose = require('mongoose');

// // const variantSchema = new mongoose.Schema({
// //   name: String,        // e.g. "Large", "Blue - XL"
// //   price: Number,
// //   options: [{
// //     key: String,       // Flexible! Example: "size", "color", "portion"
// //     value: String,
// //   }]
// // }, { _id: false });

// // const productSchema = new mongoose.Schema({
// //   // vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
// //   // title: { type: String, required: true },
// //   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
// // type: { type: String, enum: ['food', 'apparel', 'electronics', 'service'], required: true },
// //   description: String,
// //   category: { type: mongoose.Schema .Types.ObjectId, ref: 'Category' },
// //   type: { type: String, enum: ['food', 'apparel', 'electronics', 'service'], required: true },
// //   images: [String],
// //   isActive: { type: Boolean, default: true },     // ADMIN AVAILABILITY TOGGLE
// //   variants: [variantSchema],                      // VARIANT ARRAY for ANY product type!
// //   //...
// // }, {
// //   timestamps: true,
// // });

// // module.exports = mongoose.model('Product', productSchema);




// // // const mongoose = require('mongoose');

// // // const variantSchema = new mongoose.Schema({
// // //   name: String,
// // //   price: Number,
// // //   options: [{ key: String, value: String }]
// // // }, { _id: false });

// // // const productSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   description: String,
// // //   shortDescription: String,
// // //   category: { type: String, required: true },
// // //   images: [String],
// // //   isActive: { type: Boolean, default: true },
// // //   variants: [variantSchema],
// // // }, { timestamps: true });

// // // module.exports = mongoose.model('Product', productSchema);
// const mongoose = require('mongoose');

// const variantSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   options: [{ key: String, value: String }]
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   slug: { type: String, required: true },
//   description: String,
//   shortDescription: String,
//   category: { type: String, required: true },
//   images: [String], // Cloudinary URLs
//   isActive: { type: Boolean, default: true },
//   variants: [variantSchema]
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);





























const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g., "Small", "Medium"
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  options: [{ 
    key: { type: String, required: true },          // e.g., "Size", "Color"
    value: { type: String, required: true }         // e.g., "M", "Red"
  }]
}, { _id: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  shortDescription: String,
  category: { type: String, required: true },
  images: [String],                                  // Cloudinary URLs
  isActive: { type: Boolean, default: true },       // Product availability toggle
  variants: [variantSchema],                        // Multiple variants/choices
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);    