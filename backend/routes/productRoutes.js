// const express = require("express");

// const router = express.Router();
// const Product = require('../models/Product');
// const upload = require(
//   "../middleware/upload"
// );

// const {
//   createProduct,
//   getProducts,
//   getSingleProduct,
//   updateProduct,
//   deleteProduct,
  
// } = require("../controllers/productController");

// // router.post("/", createProduct);
// router.post("/", upload.array("images", 5), createProduct );

// router.get("/", getProducts);

// router.get("/:id", getSingleProduct);

// router.put("/:id", updateProduct);
  
// router.delete("/:id", deleteProduct);

// router.patch('/:id/active', async (req, res) => {
//   const { isActive } = req.body;
//   try {
//     const prod = await Product.findByIdAndUpdate(
//       req.params.id,
//       { isActive: !!isActive },
//       { new: true }
//     );
//     if (!prod) return res.status(404).json({ message: "Not found" });
//     res.json(prod);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// // module.exports = router;
// // router.post("/", createProduct);

// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
} = require("../controllers/productController");

// Create product with multiple images
router.post("/", upload.array("images", 10), createProduct);

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getSingleProduct);

// Update product with images
router.put("/:id", upload.array("images", 10), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

// Toggle product availability (isActive)
router.patch("/:id/toggle-availability", toggleProductAvailability);

module.exports = router;