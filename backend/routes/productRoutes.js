const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/upload"
);

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  
} = require("../controllers/productController");

// router.post("/", createProduct);
router.post("/", upload.array("images", 5), createProduct );

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);
  
router.delete("/:id", deleteProduct);

// router.post("/", createProduct);

module.exports = router;