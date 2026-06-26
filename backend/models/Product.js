// // // // const mongoose = require('mongoose');

// // // // const variantSchema = new mongoose.Schema({
// // // //   name: { type: String, required: true },           // e.g., "Small", "Medium"
// // // //   price: { type: Number, required: true },
// // // //   stock: { type: Number, default: 0 },
// // // //   options: [{ 
// // // //     key: { type: String, required: true },          // e.g., "Size", "Color"
// // // //     value: { type: String, required: true }         // e.g., "M", "Red"
// // // //   }]
// // // // }, { _id: true });

// // // // const productSchema = new mongoose.Schema({
// // // //   title: { type: String, required: true },
// // // //   slug: { type: String, required: true, unique: true },
// // // //   description: String,
// // // //   shortDescription: String,
// // // //   category: { type: String, required: true },
// // // //   images: [String],                                  // Cloudinary URLs
// // // //   isActive: { type: Boolean, default: true },       // Product availability toggle
// // // //   variants: [variantSchema],                        // Multiple variants/choices
// // // //   createdAt: { type: Date, default: Date.now },
// // // //   updatedAt: { type: Date, default: Date.now }
// // // // }, { timestamps: true });

// // // // module.exports = mongoose.model('Product', productSchema);    


// // // // const mongoose = require("mongoose");
// // // // const slugify = require("slugify");

// // // // const variantSchema = new mongoose.Schema(
// // // //   {
// // // //     name: {
// // // //       type: String,
// // // //       required: true,
// // // //       trim: true,
// // // //     },

// // // //     price: {
// // // //       type: Number,
// // // //       required: true,
// // // //       min: 0,
// // // //     },

// // // //     sku: {
// // // //       type: String,
// // // //       trim: true,
// // // //     },

// // // //     stock: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },
// // // //   },
// // // //   { _id: true }
// // // // );

// // // // const productSchema = new mongoose.Schema(
// // // //   {
// // // //     name: {
// // // //       type: String,
// // // //       required: true,
// // // //       trim: true,
// // // //     },

// // // //     slug: {
// // // //       type: String,
// // // //       unique: true,
// // // //       index: true,
// // // //     },

// // // //     category: {
// // // //       type: String,
// // // //       required: true,
// // // //       trim: true,
// // // //       index: true,
// // // //     },

// // // //     shortDescription: {
// // // //       type: String,
// // // //       maxlength: 250,
// // // //     },

// // // //     description: {
// // // //       type: String,
// // // //     },

// // // //     images: [
// // // //       {
// // // //         type: String,
// // // //       },
// // // //     ],

// // // //     primaryImage: {
// // // //       type: String,
// // // //     },

// // // //     isInStock: {
// // // //       type: Boolean,
// // // //       default: true,
// // // //     },

// // // //     isActive: {
// // // //       type: Boolean,
// // // //       default: true,
// // // //     },

// // // //     isFeatured: {
// // // //       type: Boolean,
// // // //       default: false,
// // // //     },

// // // //     variants: [variantSchema],

// // // //     tags: [
// // // //       {
// // // //         type: String,
// // // //         trim: true,
// // // //       },
// // // //     ],

// // // //     sortOrder: {
// // // //       type: Number,
// // // //       default: 0,
// // // //     },

// // // //     metaTitle: {
// // // //       type: String,
// // // //     },

// // // //     metaDescription: {
// // // //       type: String,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   }
// // // // );

// // // // productSchema.pre("save", function (next) {
// // // //   if (!this.slug) {
// // // //     this.slug = slugify(this.name, {
// // // //       lower: true,
// // // //       strict: true,
// // // //     });
// // // //   }
// // // //   next();
// // // // });

// // // // module.exports = mongoose.model("Product", productSchema);
// // // const mongoose = require("mongoose");
// // // const slugify = require("slugify");

// // // // Variant Schema
// // // const variantSchema = new mongoose.Schema(
// // //   {
// // //     name: {
// // //       type: String,
// // //       required: [true, "Variant name is required"],
// // //       trim: true,
// // //     },
// // //     price: {
// // //       type: Number,
// // //       required: [true, "Variant price is required"],
// // //       min: [0, "Price must be greater than 0"],
// // //     },
// // //     sku: {
// // //       type: String,
// // //       trim: true,
// // //       default: null,
// // //     },
// // //     stock: {
// // //       type: Number,
// // //       default: 0,
// // //       min: 0,
// // //     },
// // //   },
// // //   { _id: true }
// // // );

// // // // Product Schema
// // // const productSchema = new mongoose.Schema(
// // //   {
// // //     name: {
// // //       type: String,
// // //       required: [true, "Product name is required"],
// // //       trim: true,
// // //       minlength: [3, "Product name must be at least 3 characters"],
// // //     },
// // //     slug: {
// // //       type: String,
// // //       unique: true,
// // //       sparse: true,
// // //       lowercase: true,
// // //       trim: true,
// // //     },
// // //     category: {
// // //       type: String,
// // //       required: [true, "Category is required"],
// // //       trim: true,
// // //       index: true,
// // //     },
// // //     shortDescription: {
// // //       type: String,
// // //       trim: true,
// // //       maxlength: [250, "Short description cannot exceed 250 characters"],
// // //       default: "",
// // //     },
// // //     description: {
// // //       type: String,
// // //       trim: true,
// // //       default: "",
// // //     },
// // //     images: [
// // //       {
// // //         type: String,
// // //       },
// // //     ],
// // //     primaryImage: {
// // //       type: String,
// // //       default: "",
// // //     },
// // //     isInStock: {
// // //       type: Boolean,
// // //       default: true,
// // //       index: true,
// // //     },
// // //     isActive: {
// // //       type: Boolean,
// // //       default: true,
// // //       index: true,
// // //     },
// // //     isFeatured: {
// // //       type: Boolean,
// // //       default: false,
// // //       index: true,
// // //     },
// // //     variants: [variantSchema],
// // //   },
// // //   {
// // //     timestamps: true,
// // //     strict: true,
// // //   }
// // // );

// // // // =========================================================================
// // // // PRE-SAVE HOOK - GENERATE SLUG
// // // // =========================================================================
// // // productSchema.pre("save", function (next) {
// // //   // Only generate slug if name is provided and slug doesn't exist
// // //   if (this.name && !this.slug) {
// // //     this.slug = slugify(this.name, {
// // //       lower: true,
// // //       strict: true,
// // //       replacement: "-",
// // //     });
// // //   }
  
// // //   // Continue to next middleware
// // //   return next();
// // // });

// // // // =========================================================================
// // // // PRE-SAVE HOOK - HANDLE DUPLICATE SLUG
// // // // =========================================================================
// // // productSchema.pre("save", async function (next) {
// // //   if (this.isModified("slug")) {
// // //     const existingProduct = await mongoose.model("Product").findOne({
// // //       slug: this.slug,
// // //       _id: { $ne: this._id },
// // //     });

// // //     if (existingProduct) {
// // //       this.slug = `${this.slug}-${Date.now()}`;
// // //     }
// // //   }
  
// // //   return next();
// // // });

// // // // Create model
// // // const Product = mongoose.model("Product", productSchema);

// // // module.exports = Product;














// // const mongoose = require("mongoose");
// // const slugify = require("slugify");

// // // =========================================================================
// // // VARIANT SCHEMA
// // // =========================================================================
// // const variantSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: [true, "Variant name is required"],
// //       trim: true,
// //     },
// //     price: {
// //       type: Number,
// //       required: [true, "Variant price is required"],
// //       min: [0, "Price must be greater than 0"],
// //     },
// //     sku: {
// //       type: String,
// //       trim: true,
// //       default: null,
// //     },
// //     stock: {
// //       type: Number,
// //       default: 0,
// //       min: 0,
// //     },
// //   },
// //   { _id: true }
// // );

// // // =========================================================================
// // // PRODUCT SCHEMA
// // // =========================================================================
// // const productSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: [true, "Product name is required"],
// //       trim: true,
// //       minlength: [3, "Product name must be at least 3 characters"],
// //     },
// //     slug: {
// //       type: String,
// //       unique: true,
// //       sparse: true,
// //       lowercase: true,
// //       trim: true,
// //     },
// //     category: {
// //       type: String,
// //       required: [true, "Category is required"],
// //       trim: true,
// //       index: true,
// //     },
// //     shortDescription: {
// //       type: String,
// //       trim: true,
// //       maxlength: [250, "Short description cannot exceed 250 characters"],
// //       default: "",
// //     },
// //     description: {
// //       type: String,
// //       trim: true,
// //       default: "",
// //     },
// //     images: [{ type: String }],
// //     primaryImage: {
// //       type: String,
// //       default: "",
// //     },
// //     isInStock: {
// //       type: Boolean,
// //       default: true,
// //       index: true,
// //     },
// //     isActive: {
// //       type: Boolean,
// //       default: true,
// //       index: true,
// //     },
// //     isFeatured: {
// //       type: Boolean,
// //       default: false,
// //       index: true,
// //     },
// //     variants: [variantSchema],
// //   },
// //   {
// //     timestamps: true,
// //     strict: true,
// //   }
// // );

// // // =========================================================================
// // // PRE-SAVE HOOK — Generate + deduplicate slug in a single hook
// // // Using a regular (non-async) function with manual promise handling
// // // to avoid the "next is not a function" issue with async pre-save hooks.
// // // =========================================================================
// // productSchema.pre("save", function (next) {
// //   const doc = this;

// //   // Step 1: Generate slug from name if not already set
// //   if (doc.name && !doc.slug) {
// //     doc.slug = slugify(doc.name, {
// //       lower: true,
// //       strict: true,
// //       replacement: "-",
// //     });
// //   }

// //   // Step 2: If slug was just set or modified, check for duplicates
// //   if (!doc.isModified("slug")) {
// //     return next();
// //   }

// //   mongoose
// //     .model("Product")
// //     .findOne({ slug: doc.slug, _id: { $ne: doc._id } })
// //     .then((existing) => {
// //       if (existing) {
// //         doc.slug = `${doc.slug}-${Date.now()}`;
// //       }
// //       next();
// //     })
// //     .catch((err) => next(err));
// // });

// // const Product = mongoose.model("Product", productSchema);

// // module.exports = Product;



















// const mongoose = require("mongoose");
// const slugify  = require("slugify");

// // ============================================================================
// // VARIANT SCHEMA
// // ============================================================================
// const variantSchema = new mongoose.Schema(
//   {
//     name: {
//       type:     String,
//       required: [true, "Variant name is required"],
//       trim:     true,
//     },
//     price: {
//       type:     Number,
//       required: [true, "Variant price is required"],
//       min:      [0, "Price must be greater than 0"],
//     },
//     sku: {
//       type:    String,
//       trim:    true,
//       default: null,
//     },
//     stock: {
//       type:    Number,
//       default: 0,
//       min:     0,
//     },
//   },
//   { _id: true }
// );

// // ============================================================================
// // PRODUCT SCHEMA
// // ============================================================================
// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type:      String,
//       required:  [true, "Product name is required"],
//       trim:      true,
//       minlength: [3, "Product name must be at least 3 characters"],
//     },
//     slug: {
//       type:      String,
//       unique:    true,
//       sparse:    true,
//       lowercase: true,
//       trim:      true,
//     },
//     category: {
//       type:     String,
//       required: [true, "Category is required"],
//       trim:     true,
//       index:    true,
//     },
//     shortDescription: {
//       type:      String,
//       trim:      true,
//       maxlength: [250, "Short description cannot exceed 250 characters"],
//       default:   "",
//     },
//     description: {
//       type:    String,
//       trim:    true,
//       default: "",
//     },
//     images:       [{ type: String }],
//     primaryImage: { type: String, default: "" },
//     isInStock: {
//       type:    Boolean,
//       default: true,
//       index:   true,
//     },
//     isActive: {
//       type:    Boolean,
//       default: true,
//       index:   true,
//     },
//     isFeatured: {
//       type:    Boolean,
//       default: false,
//       index:   true,
//     },
//     variants: [variantSchema],
//   },
//   {
//     timestamps: true,
//     strict:     true,
//   }
// );

// // ============================================================================
// // PRE-SAVE HOOK — generate slug + deduplicate
// // Key fix: use `this.constructor` instead of `mongoose.model("Product")`
// // so the model reference is always valid regardless of registration order.
// // ============================================================================
// productSchema.pre("save", function (next) {
//   const doc = this;

//   // Generate slug from name if not already set
//   if (doc.name && !doc.slug) {
//     doc.slug = slugify(doc.name, {
//       lower:       true,
//       strict:      true,
//       replacement: "-",
//     });
//   }

//   // Nothing to deduplicate if slug wasn't touched
//   if (!doc.isModified("slug")) {
//     return next();
//   }

//   // Use this.constructor — safe reference to the registered model
//   doc.constructor
//     .findOne({ slug: doc.slug, _id: { $ne: doc._id } })
//     .then((existing) => {
//       if (existing) {
//         doc.slug = `${doc.slug}-${Date.now()}`;
//       }
//       next();
//     })
//     .catch((err) => next(err));
// });

// module.exports = mongoose.model("Product", productSchema);






















const mongoose = require("mongoose");
const slugify = require("slugify");

// ==========================================================
// Variant Schema
// ==========================================================
const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Variant name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Variant price is required"],
      min: [0, "Price cannot be negative"],
    },

    sku: {
      type: String,
      trim: true,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true }
);

// ==========================================================
// Product Schema
// ==========================================================
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    primaryImage: {
      type: String,
      default: "",
    },

    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one variant is required",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isInStock: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================================
// Generate Slug
// ==========================================================
productSchema.pre("save", async function () {
  if (!this.slug && this.name) {
    let baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (
      await this.constructor.findOne({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
});

module.exports = mongoose.model("Product", productSchema);