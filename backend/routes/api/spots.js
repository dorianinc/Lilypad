const express = require("express");
const { check } = require("express-validator");
const { validateSpot, validateReview, validateBooking } = require("../../utils/validation");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

// get all spots
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
        preview: true
      },
    });
    const test = previewImage
    console.log("previewImage 👉", test.dataValues)

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
    // currentSpot.previewImage = previewImage.url;
  }

  res.status(200).json({ Spots: spots });
});

// get all spots based on ownerId
router.get("/current", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
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

  res.status(200).json({ Spots: userSpots });
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
  res.status(200).json(spot);
});

// post a new spot
router.post("/", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;
  const reqData = { ownerId: user.id };

  for (property in req.body) {
    let value = req.body[property];
    reqData[property] = value;
  }
  const newSpot = await Spot.create({ ...reqData });
  res.status(201).json(newSpot);
});

// add image to a spot through spot id
router.post("/:spotId/images", [restoreUser, requireAuth], async (req, res, next) => {
  const { user } = req;
  const { url } = req.body;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }

  const userId = user.id;
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const newImage = await SpotImage.create({
    url,
    spotId: spot.id,
  });
  res.status(201);
  res.json(newImage);
});

// edit spot by id
router.put("/:spotId", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }

  const userId = user.id;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  for (property in req.body) {
    let value = req.body[property];
    spot[property] = value;
  }

  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await spot.save();
  res.status(200).json(spot);
});

router.delete("/:spotId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }
  const userId = user.id;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  if (userId !== spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

// create a review for a spot based on spot id
router.post("/:spotId/reviews", [restoreUser, requireAuth, validateReview], async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  console.log("userId =>", user.id);
  if (!spot)
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  if (await Review.findOne({ where: { userId: user.id, spotId: spot.id } })) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }
  const newReview = await Review.create({
    userId: user.id,
    spotId: spot.id,
    review,
    stars,
  });

  res.status(201).json(newReview);
});

// get all reviews by spot id
router.get("/:spotId/reviews", [restoreUser, requireAuth], async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });
  if (!reviews.length)
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  res.json({ Reviews: reviews });
});

router.post("/:spotId/bookings", [restoreUser, requireAuth, validateBooking], async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }
  if(await Spot.findOne({where: {ownerId: user.id}})) console.log("this the owners! rruuuuuun")
  const { startDate, endDate } = req.body;
  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: user.id,
    startDate,
    endDate,
  });
  console.log("newBooking 👉", newBooking.toJSON());

  res.status(200).json(newBooking);
});

module.exports = router;
