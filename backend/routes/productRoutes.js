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