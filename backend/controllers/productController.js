const Product = require("../models/Product");

// ============================================================================
// HELPER — validate MongoDB ObjectId format
// ============================================================================
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// ============================================================================
// CREATE PRODUCT
// ============================================================================
const createProduct = async (req, res, next) => {
  try {
    // --- Name ---
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }
    const productName = req.body.name.trim();
    if (productName.length < 3) {
      return res.status(400).json({ success: false, message: "Product name must be at least 3 characters long" });
    }
    if (productName.length > 100) {
      return res.status(400).json({ success: false, message: "Product name cannot exceed 100 characters" });
    }

    // --- Category ---
    if (!req.body.category || !req.body.category.trim()) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    // --- Images ---
    const imageUrls = req.files?.map((file) => file.path) || [];
    if (imageUrls.length === 0) {
      return res.status(400).json({ success: false, message: "At least one product image is required" });
    }

    // --- Variants ---
    let variants = [];
    if (req.body.variants) {
      try {
        variants = typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
      } catch {
        return res.status(400).json({ success: false, message: "Invalid variants format. Must be a valid JSON array." });
      }
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ success: false, message: "At least one product variant is required" });
    }

    const sanitisedVariants = [];
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];

      if (!v.name || !String(v.name).trim()) {
        return res.status(400).json({ success: false, message: `Variant ${i + 1}: Name is required` });
      }
      if (v.price === undefined || v.price === null || isNaN(v.price)) {
        return res.status(400).json({ success: false, message: `Variant ${i + 1}: Price must be a valid number` });
      }
      if (Number(v.price) <= 0) {
        return res.status(400).json({ success: false, message: `Variant ${i + 1}: Price must be greater than 0` });
      }

      sanitisedVariants.push({
        name: String(v.name).trim(),
        price: Number(v.price),
        sku: v.sku ? String(v.sku).trim() : `SKU-${Date.now()}-${i}`,
        stock: Number(v.stock) || 0,
      });
    }

    // --- Create ---
    const product = await Product.create({
      name: productName,
      category: req.body.category.trim(),
      shortDescription: req.body.shortDescription ? req.body.shortDescription.trim() : "",
      description: req.body.description ? req.body.description.trim() : "",
      images: imageUrls,
      primaryImage: imageUrls[0] || "",
      variants: sanitisedVariants,
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true,
      isInStock: req.body.isInStock !== undefined ? Boolean(req.body.isInStock) : true,
      isFeatured: req.body.isFeatured !== undefined ? Boolean(req.body.isFeatured) : false,
    });

    console.log("✅ Product created:", product._id);
    return res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.error("❌ CREATE PRODUCT ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// GET ALL PRODUCTS
// ============================================================================
const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const all = req.query.all === "true";

    if (page < 1) {
      return res.status(400).json({ success: false, message: "Page must be at least 1" });
    }
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ success: false, message: "Limit must be between 1 and 100" });
    }

    const query = { isActive: true };

    if (search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }
    if (category.trim()) {
      query.category = category.trim();
    }

    // const [total, products] = await Promise.all([
    //   Product.countDocuments(query),
    //   Product.find(query)
    //     .sort({ createdAt: -1 })
    //     .skip((page - 1) * limit)
    //     .limit(limit)
    //     .lean(),
    // ]);
    const total = await Product.countDocuments(query);

    let productsQuery = Product.find(query)
      .sort({ createdAt: -1 });

    if (!all) {
      productsQuery = productsQuery
        .skip((page - 1) * limit)
        .limit(limit);
    }

    const products = await productsQuery.lean();

    return res.status(200).json({
      // success: true,
      // total,
      // page,
      // pages: Math.ceil(total / limit),
      // products,
      success: true,
      total,
      page: all ? 1 : page,
      pages: all
        ? 1 
        : Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// GET PRODUCT BY ID
// ============================================================================
const getProductById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("❌ GET PRODUCT BY ID ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// GET PRODUCT BY SLUG
// ============================================================================
const getProductBySlug = async (req, res, next) => {
  try {
    if (!req.params.slug || !req.params.slug.trim()) {
      return res.status(400).json({ success: false, message: "Slug is required" });
    }

    const product = await Product.findOne({
      slug: req.params.slug.trim(),
      isActive: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("❌ GET PRODUCT BY SLUG ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// UPDATE PRODUCT
// ============================================================================
const updateProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const updateData = {};

    if (req.body.name !== undefined) {
      const productName = req.body.name.trim();
      if (!productName) {
        return res.status(400).json({ success: false, message: "Product name cannot be empty" });
      }
      if (productName.length < 3) {
        return res.status(400).json({ success: false, message: "Product name must be at least 3 characters long" });
      }
      updateData.name = productName;
    }

    if (req.body.category !== undefined) {
      const cat = req.body.category.trim();
      if (!cat) {
        return res.status(400).json({ success: false, message: "Category cannot be empty" });
      }
      updateData.category = cat;
    }

    if (req.body.shortDescription !== undefined) {
      updateData.shortDescription = req.body.shortDescription.trim();
    }
    if (req.body.description !== undefined) {
      updateData.description = req.body.description.trim();
    }

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((f) => f.path);
      updateData.images = imageUrls;
      updateData.primaryImage = imageUrls[0];
    }

    if (req.body.variants !== undefined) {
      let variants = [];
      try {
        variants = typeof req.body.variants === "string"
          ? JSON.parse(req.body.variants)
          : req.body.variants;
      } catch {
        return res.status(400).json({ success: false, message: "Invalid variants format" });
      }

      if (Array.isArray(variants) && variants.length > 0) {
        const sanitisedVariants = [];
        for (let i = 0; i < variants.length; i++) {
          const v = variants[i];
          if (!v.name || !String(v.name).trim()) {
            return res.status(400).json({ success: false, message: `Variant ${i + 1}: Name is required` });
          }
          if (v.price === undefined || v.price === null || isNaN(v.price)) {
            return res.status(400).json({ success: false, message: `Variant ${i + 1}: Price must be a valid number` });
          }
          sanitisedVariants.push({
            name: String(v.name).trim(),
            price: Number(v.price),
            sku: v.sku ? String(v.sku).trim() : `SKU-${Date.now()}-${i}`,
            stock: Number(v.stock) || 0,
          });
        }
        updateData.variants = sanitisedVariants;
      }
    }

    if (req.body.isActive !== undefined) updateData.isActive = Boolean(req.body.isActive);
    if (req.body.isInStock !== undefined) updateData.isInStock = Boolean(req.body.isInStock);
    if (req.body.isFeatured !== undefined) updateData.isFeatured = Boolean(req.body.isFeatured);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("✅ Product updated:", product._id);
    return res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.error("❌ UPDATE PRODUCT ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// DELETE PRODUCT (soft delete)
// ============================================================================
const deleteProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("✅ Product archived:", product._id);
    return res.status(200).json({ success: true, message: "Product archived successfully" });
  } catch (error) {
    console.error("❌ DELETE PRODUCT ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// TOGGLE HELPERS
// Uses findByIdAndUpdate to avoid re-running full-document validation
// (which caused the "name is required" error when calling product.save())
// ============================================================================

const toggleProductAvailability = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    // Read current value first, then flip it atomically
    const current = await Product.findById(req.params.id).select("isActive");
    if (!current) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: !current.isActive },
      { new: true, runValidators: false }
    );

    console.log("✅ Availability toggled:", product._id, "→ isActive:", product.isActive);
    return res.status(200).json({
      success: true,
      message: product.isActive ? "Product activated" : "Product deactivated",
      product,
    });
  } catch (error) {
    console.error("❌ TOGGLE AVAILABILITY ERROR:", error.message);
    next(error);
  }
};

const toggleFeaturedProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const current = await Product.findById(req.params.id).select("isFeatured");
    if (!current) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isFeatured: !current.isFeatured },
      { new: true, runValidators: false }
    );

    console.log("✅ Featured toggled:", product._id, "→ isFeatured:", product.isFeatured);
    return res.status(200).json({
      success: true,
      message: product.isFeatured ? "Added to featured" : "Removed from featured",
      product,
    });
  } catch (error) {
    console.error("❌ TOGGLE FEATURED ERROR:", error.message);
    next(error);
  }
};

const toggleStockStatus = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const current = await Product.findById(req.params.id).select("isInStock");
    if (!current) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isInStock: !current.isInStock },
      { new: true, runValidators: false }
    );

    console.log("✅ Stock toggled:", product._id, "→ isInStock:", product.isInStock);
    return res.status(200).json({
      success: true,
      message: product.isInStock ? "In stock" : "Out of stock",
      product,
    });
  } catch (error) {
    console.error("❌ TOGGLE STOCK ERROR:", error.message);
    next(error);
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
  toggleFeaturedProduct,
  toggleStockStatus,
};