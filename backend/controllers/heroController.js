const HeroSection = require(
  "../models/HeroSection"
);

const createHero = async (req, res) => {
  try {
    const hero =
      await HeroSection.create({
        ...req.body,

        image: req.files.image?.[0]?.path,

        mobileImage:
          req.files.mobileImage?.[0]?.path,
      });

    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getHeroes = async (req, res) => {
  try {
    const heroes =
      await HeroSection.find();

    res.json(heroes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateHero = async (req, res) => {
  try {
    const hero =
      await HeroSection.findById(
        req.params.id
      );

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    hero.title =
      req.body.title || hero.title;

    hero.subtitle =
      req.body.subtitle ||
      hero.subtitle;

    hero.description =
      req.body.description ||
      hero.description;

    hero.buttonText =
      req.body.buttonText ||
      hero.buttonText;

    hero.buttonLink =
      req.body.buttonLink ||
      hero.buttonLink;

    hero.layoutType =
      req.body.layoutType ||
      hero.layoutType;

    hero.backgroundColor =
      req.body.backgroundColor ||
      hero.backgroundColor;

    hero.textColor =
      req.body.textColor ||
      hero.textColor;

    if (req.files.image) {
      hero.image =
        req.files.image[0].path;
    }

    if (req.files.mobileImage) {
      hero.mobileImage =
        req.files.mobileImage[0].path;
    }

    await hero.save();

    res.json(hero);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteHero = async (req, res) => {
  try {
    await HeroSection.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Hero Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHero,
  getHeroes,
  updateHero,
  deleteHero,
};