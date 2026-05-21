const Product = require("../models/Product");



// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {

    // uploaded image urls from cloudinary
    const imageUrls = req.files.map(
      (file) => file.path
    );

    const product = await Product.create({
      ...req.body,

      images: imageUrls,
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("category");

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET SINGLE PRODUCT
const getSingleProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      ).populate("category");

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// UPDATE PRODUCT
const updateProduct = async (
  req,
  res
) => {
  try {

    let updatedData = {
      ...req.body,
    };



    // if new images uploaded
    if (
      req.files &&
      req.files.length > 0
    ) {

      const imageUrls =
        req.files.map(
          (file) => file.path
        );

      updatedData.images =
        imageUrls;
    }



    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,

        updatedData,

        {
          new: true,
        }
      );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE PRODUCT
const deleteProduct = async (
  req,
  res
) => {
  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ...existing requires

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, images, type, variants, vendorId } = req.body;
    const product = new Product({
      vendorId,
      title,
      description,
      category,
      images,
      type,
      variants,   // [{ name, price, options }]
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    });
    await product.save();
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
// UPDATE product — similar, allow full variants update!
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};