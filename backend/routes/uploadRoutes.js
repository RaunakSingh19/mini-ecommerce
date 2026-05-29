const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    try {
      res.status(200).json({
        secure_url: req.file.path,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

module.exports = router;