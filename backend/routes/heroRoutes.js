const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/upload"
);

const {
  createHero,
  getHeroes,
  updateHero,
  deleteHero,
} = require(
  "../controllers/heroController"
);

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },

    {
      name: "mobileImage",
      maxCount: 1,
    },
  ]),
  createHero
);

router.get("/", getHeroes);

router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },

    {
      name: "mobileImage",
      maxCount: 1,
    },
  ]),
  updateHero
);

router.delete("/:id", deleteHero);

module.exports = router;