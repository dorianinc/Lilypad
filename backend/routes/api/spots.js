const express = require("express");
const { validateSpot, validateReview, validateBooking } = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist} = require("../../utils/utilities.js")
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

// Get all Spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({ raw: true });

  for (currentSpot of spots) {
    const starSum = await Review.sum("stars", {
      where: {
        spotId: currentSpot.id,
      },
    });

    const totalReviews = await Review.count({
      where: {
        spotId: currentSpot.id,
      },
    });

    const image = await SpotImage.findOne({
      where: {
        spotId: currentSpot.id,
      },
    });

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
    currentSpot.previewImage = image.url;
  }

  res.status(200).json({ Spots: spots });
});

// Get all Spots of Specfic Owner
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
    const starSum = await Review.sum("stars", {
      where: {
        spotId: currentSpot.id,
      },
    });

    const totalReviews = await Review.count({
      where: {
        spotId: currentSpot.id,
      },
    });

    const image = await SpotImage.findOne({
      where: {
        spotId: currentSpot.id,
      },
    });

    average = starSum / totalReviews;
    currentSpot.avgRating = average;
    currentSpot.previewImage = image.url;
  }

  res.status(200).json({ Spots: userSpots });
});

// Get Details of Specific Spot
router.get("/:spotId", async (req, res) => {
  const currentSpotId = req.params.spotId;
  const spot = await Spot.findByPk(currentSpotId, { raw: true });

  if (!spot) res.status(404).json(doesNotExist("Spot"));

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

// Create a new Spot
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

// Add Image to a Spot
router.post("/:spotId/images", [restoreUser, requireAuth], async (req, res, next) => {
  const { user } = req;
  const { url } = req.body;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));

  if (isAuthorized(user.id, spot.ownerId, res)) {
    const newImage = await SpotImage.create({
      url,
      spotId: spot.id,
    });
    res.status(200).json(newImage);
  }
});

// Update a Spot
router.put("/:spotId", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) res.status(404).json(doesNotExist("Spot"));

  if (isAuthorized(user.id, spot.ownerId, res)) {
    for (property in req.body) {
      let value = req.body[property];
      spot[property] = value;
    }
    await spot.save();
    res.status(200).json(spot);
  }
});
// Delete a Spot
router.delete("/:spotId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) res.status(404).json(doesNotExist("Spot"));

  if (isAuthorized(user.id, spot.ownerId, res)) {
   await spot.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

// Create Review for Spot
router.post("/:spotId/reviews", [restoreUser, requireAuth, validateReview], async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));

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

  res.status(200).json(newReview);
});

// Get all Reviews of Specific Spot
router.get("/:spotId/reviews", async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  if (!reviews.length) res.status(404).json(doesNotExist("Spot"));
  else res.status(200).json({ Reviews: reviews });
});

// Create New Booking for Specific Spot
router.post("/:spotId/bookings", [restoreUser, requireAuth, validateBooking], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));

  const { startDate, endDate } = req.body;
  const bookedDates = await Booking.findAll({
    attributes: ["id", "startDate", "endDate"],
    raw: true,
  });

  if (user.id !== spot.ownerId) {
    if (isAvailable(startDate, endDate, bookedDates, res)) {
      const newBooking = await Booking.create({
        spotId: spot.id,
        userId: user.id,
        startDate,
        endDate,
      });
      res.status(200).json(newBooking);
    }
  } else {
    res.json("Bro, you cant book your own spot");
  }
});

// Get all Bookings of Specific Spot
router.get("/:spotId/bookings", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));

  let booking;

  if (user.id === spot.ownerId) {
    booking = await Booking.unscoped().findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: { model: User, attributes: ["id", "firstName", "lastName"] },
    });
  } else {
    booking = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });
  }

  res.status(200).json(booking);
});

module.exports = router;
