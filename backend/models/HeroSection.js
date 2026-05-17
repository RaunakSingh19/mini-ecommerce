// const mongoose = require("mongoose");

// const heroSchema = new mongoose.Schema(
//   {
//     title: String,

//     subtitle: String,

//     description: String,

//     buttonText: String,

//     buttonLink: String,

//     image: String,

//     mobileImage: String,

//     layoutType: {
//       type: String,

//       enum: [
//         "left-image",
//         "right-image",
//         "full-banner",
//         "center-content",
//         "image-only",
//       ],

//       default: "left-image",
//     },

//     backgroundColor: {
//       type: String,

//       default: "#ffffff",
//     },

//     textColor: {
//       type: String,

//       default: "#000000",
//     },

//     isActive: {
//       type: Boolean,

//       default: true,
//     },
//   },

//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model(
//   "HeroSection",
//   heroSchema
// );  

const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    subtitle: {
      type: String,
    },

    description: {
      type: String,
    },

    buttonText: {
      type: String,
    },

    buttonLink: {
      type: String,
    },

    image: {
      type: String,
    },

    layoutType: {
      type: String,

      enum: [
        "left-image",
        "right-image",
        "center-content",
        "image-only",
      ],

      default: "left-image",
    },

    backgroundColor: {
      type: String,

      default: "#ffffff",
    },

    textColor: {
      type: String,

      default: "#000000",
    },

    active: {
      type: Boolean,

      default: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Hero ||
  mongoose.model("Hero", heroSchema); 