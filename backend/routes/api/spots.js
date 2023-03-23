const express = require("express");
const { check } = require("express-validator");
const { validateSpotPost } = require("../../utils/validation");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({ raw: true });

  for (currentSpot of spots) {
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

    let previewImage = await SpotImage.findOne({
      where: {
        spotId: currentSpot.id,
        preview: true,
      },
      raw: true,
    });

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
    currentSpot.previewImage = previewImage.url;
  }

  res.status(200).json(spots);
});

// get all spots based on ownerId
router.get("/current",[restoreUser, requireAuth], async (req, res) => {
  const userId = user.id;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    raw: true,
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

    let previewImage = await SpotImage.findOne({
      where: {
        spotId: currentSpot.id,
        preview: true,
      },
      raw: true,
    });

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
    currentSpot.previewImage = previewImage.url;
  }

  res.status(200).json(userSpots);
});

// get specific spot details based on spotId
router.get("/:spotId", async (req, res) => {
  const currentSpotId = req.params.spotId;
  const spot = await Spot.findByPk(currentSpotId, { raw: true });

  if (!spot)
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });

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

  spot.SpotImages = [];
  const spotImages = await SpotImage.findAll({
    where: {
      spotId: currentSpotId,
    },
    attributes: ["id", "url", "preview"],
    raw: true,
  });
  for (image of spotImages) spot.SpotImages.push(image);

  const owner = await User.findOne({
    where: {
      id: spot.ownerId,
    },
    attributes: ["id", "firstName", "lastName"],
    raw: true,
  });
  spot.Owner = owner;
  res.json(spot);
});

// post a new spot
router.post("/",  [restoreUser, requireAuth, validateSpotPost], async (req, res) => {
  const userId = user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  if (!user) return res.status(400).json(`Something went wrong!`);

  const newSpot = await Spot.create({
    ownerId: userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201).json(newSpot);
});

// add image to a spot through spot id
router.post("/:spotId/images", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { url } = req.body;
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot)
    res.status(404).json({
      message: "Spot couldn't be found",
    });
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

router.put("/:spotId", async (req, res) => {
  res.json("hello world");
});

module.exports = router;
