const express = require("express");
const { check } = require("express-validator");
const { validateSpotPost } = require("../../utils/validation");
const { sequelize, Spot, SpotImage, Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.status(200).json(spots);
});

// post a new spot
router.post("/", validateSpotPost, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { address, city, state, country, name, description, price } = req.body;
  if (!user) return res.status(400).json(`Something went wrong!`);

  await Spot.create({
    address,
    city,
    state,
    city,
    country,
    name,
    description,
    price,
    ownerId: userId,
  });
  res.status(201);
  res.json(`Successfully created new spot for user ${userId}`);
});

// add image to a spot through spot id
router.post("/:spotId/images", async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { url } = req.body;
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json("Spot does not exist");
  console.log("userId", userId);
  console.log("spot.ownerId", spot.ownerId);
  if (userId === spot.ownerId) {
    const newImage = await SpotImage.create({
      url,
      spotId: spot.id,
    });
    res.status(201);
    res.json(newImage);
  } else {
    res.json("Only an owner of a spot can add an image");
  }
});

// get all spots based on ownerId
router.get("/current", async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [{ model: SpotImage, as: "previewImage", attributes: ["url"] }],
    raw: true,
    // group: "address",
  });

  for (currentSpot of userSpots) {
    let starSum = await Review.sum("stars", {
      where: {
        spotId: currentSpot.id,
      },
    });
    let starCount = await Review.count({
      where: {
        spotId: currentSpot.id,
      },
    });

    average = starSum / starCount;
    currentSpot.avgRating = average;
  }

  res.json(userSpots);
});

module.exports = router;
