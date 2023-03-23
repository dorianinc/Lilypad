const express = require("express");
const { check } = require("express-validator");
const { validateSpotPost } = require("../../utils/validation");
const { sequelize, Spot, SpotImage, Review, User } = require("../../db/models");

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
  if (!spot) res.status(404).json("Error: This spot does not exist");
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
    group: ["previewImage.url","Spot.id"],
  });

  for (currentSpot of userSpots) {
    let starSum = await Review.sum("stars", {
      where: {
        spotId: currentSpot.id,
      },
    });
    let totalReviews = await Review.count({
      where: {
        spotId: currentSpot.id,
      },
    });

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
  }

  res.json(userSpots);
});

// get specific spot details based on spotId
router.get("/:spotId", async (req, res) => {
  const currentSpotId = req.params.spotId;
  const spot = await Spot.findByPk(currentSpotId, {
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "firstName", "lastName"],

      },
    ],
    raw: true,
  });

  if (!spot) res.status(404).json("Error: This spot does not exist");

  const totalReviews = await Review.count({
    where: {
      spotId: currentSpotId,
    },
  });
  spot.numReviews = totalReviews;

  const starSum = await Review.sum("stars", {
    where: {
      spotId: currentSpotId,
    },
  });
  spot.avgStarRating = starSum / totalReviews;

  spot.images = [];
  const spotImages = await SpotImage.findAll({
    where: {
      spotId: currentSpotId,
    },
    attributes: ["id", "url", "preview"],
    raw: true,
  });

  for (image of spotImages) spot.images.push(image);

  res.json(spot);
});

module.exports = router;
