// // const express = require("express");
// // const router = express.Router();
// // const upload = require("../middleware/upload");

// // const {
// //   createProduct,
// //   getProducts,
// //   getSingleProduct,
// //   updateProduct,
// //   deleteProduct,
// //   toggleProductAvailability,
// // } = require("../controllers/productController");

// // // Create product with multiple images
// // router.post("/", upload.array("images", 10), createProduct);

// // // Get all products
// // router.get("/", getProducts);

// // // Get single product
// // router.get("/:id", getSingleProduct);

// // // Update product with images
// // router.put("/:id", upload.array("images", 10), updateProduct);

// // // Delete product
// // router.delete("/:id", deleteProduct);

// // // Toggle product availability (isActive)
// // router.patch("/:id/toggle-availability", toggleProductAvailability);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");

// const {
// createProduct,
// getProducts,
// getProductById,
// getProductBySlug,
// updateProduct,
// deleteProduct,
// toggleProductAvailability,
// toggleFeaturedProduct,
// toggleStockStatus,
// } = require("../controllers/productController");

// /* |                                                                          |
// | -------------------------------------------------------------------------- |
// | Product CRUD                                                               |
// | -------------------------------------------------------------------------- |
// |                                                                       | */      

// // Create Product
// router.post(
// "/",
// upload.array("images", 10),
// createProduct
// );

// // Get All Products
// router.get("/", getProducts);

// // Get Single Product By ID
// router.get("/id/:id", getProductById);

// // Get Product By Slug
// router.get("/slug/:slug", getProductBySlug);

// // Update Product
// router.put(
// "/:id",
// upload.array("images", 10),
// updateProduct
// );

// // Soft Delete Product
// router.delete("/:id", deleteProduct);

// /* |                                                                          |
// | -------------------------------------------------------------------------- |
// | Product Toggles                                                            |
// | -------------------------------------------------------------------------- |
// |                                                                   | */      

// // Active / Inactive
// router.patch(
// "/:id/toggle-availability",
// toggleProductAvailability
// );

// // Featured Product
// router.patch(
// "/:id/toggle-featured",
// toggleFeaturedProduct
// );

// // In Stock / Out Of Stock
// router.patch(
// "/:id/toggle-stock",
// toggleStockStatus
// );

// module.exports = router;

const express = require("express");
const router  = express.Router();
const upload  = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
  toggleFeaturedProduct,
  toggleStockStatus,
} = require("../controllers/productController");

// ============================================================================
// CRUD
// ============================================================================
router.post  ("/",              upload.array("images", 10), createProduct);
router.get   ("/",              getProducts);
router.get   ("/id/:id",        getProductById);
router.get   ("/slug/:slug",    getProductBySlug);
router.put   ("/:id",          upload.array("images", 10), updateProduct);
router.delete("/:id",           deleteProduct);

// ============================================================================
// TOGGLES
// ============================================================================
router.patch("/:id/toggle-availability", toggleProductAvailability);
router.patch("/:id/toggle-featured",     toggleFeaturedProduct);
router.patch("/:id/toggle-stock",        toggleStockStatus);

module.exports = router;