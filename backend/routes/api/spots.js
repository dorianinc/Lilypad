const express = require("express");
const {
  validateSpot,
  validateReview,
  validateBooking,
  validateQueries,
} = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist } = require("../../utils/utilities.js");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

// Get all Spots
router.get("/", validateQueries, async (req, res) => {
  //  start of querying settings //
  ////////// start of page and size logic /////////////
  let { page, size } = req.query;

  // set defaults for page and sizes
  if (!page) page = 1;
  if (!size) size = 20;

  // convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // declare limits for page and size
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  let pagination = {};
  pagination.limit = size;
  pagination.offset = size * (page - 1);
  ////////// end of page and size logic /////////////

  ////////// start of filtering logic /////////////
  const { city, state, country } = req.query;
  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const where = {}; // will hold all our filters

  // Latitude
  if (minLat) {
    where.lat = { [Op.gte]: minLat };
  }
  if (maxLat) {
    where.lat = { [Op.lte]: maxLat };
  }

  // Longitude
  if (minLng) {
    where.lng = { [Op.gte]: minLng };
  }
  if (maxLng) {
    where.lng = { [Op.lte]: maxLng };
  }

  // Price
  if (minPrice) {
    where.price = { [Op.gte]: minPrice };
  }
  if (maxPrice) {
    where.price = { [Op.lte]: maxPrice };
  }
  ////////// end of filtering logic /////////////
  // end of querying settings //

  const spots = await Spot.findAll({
    where,
    ...pagination,
    raw: true,
  });

  for (spot of spots) {
    const starSum = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    const totalReviews = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    average = starSum / totalReviews;
    spot.avgRating = average;

    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    if (previewImage) spot.previewImage = previewImage.url;
    else spot.previewImage = "image url";
  }

  res.status(200).json({ Spots: spots, page, size });
});

// Get all Spots of Specfic Owner
router.get("/current", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    raw: true,
  });

  for (spot of spots) {
    const starSum = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    const totalReviews = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    average = starSum / totalReviews;
    spot.avgRating = average;

    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    if (previewImage) spot.previewImage = previewImage.url;
    else spot.previewImage = "image url";
  }

  res.status(200).json(spots);
});

// Get Details of Specific Spot
router.get("/:spotId", async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId, { raw: true });

  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    const totalReviews = await Review.count({
      where: {
        spotId: spotId,
      },
    });
    spot.numReviews = totalReviews;

    const starSum = await Review.sum("stars", {
      where: {
        spotId: spotId,
      },
    });
    spot.avgStarRating = starSum / totalReviews;

    spot.SpotImages = [];
    const spotImages = await SpotImage.findAll({
      where: {
        spotId: spotId,
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
  }
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
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    if (isAuthorized(user.id, spot.ownerId, res)) {
      const newImage = await SpotImage.create({
        url,
        preview,
        spotId: spot.id,
      });
      res.status(200).json(newImage);
    }
  }
});

// Update a Spot
router.put("/:spotId", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    if (isAuthorized(user.id, spot.ownerId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        spot[property] = value;
      }
      await spot.save();
      res.status(200).json(spot);
    }
  }
});

// Delete a Spot
router.delete("/:spotId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    if (isAuthorized(user.id, spot.ownerId, res)) {
      await spot.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
});

// Create Review for Spot
router.post("/:spotId/reviews", [restoreUser, requireAuth, validateReview], async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    if (await Review.findOne({ where: { userId: user.id, spotId: spot.id } })) {
      return res.status(403).json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    } else {
      const newReview = await Review.create({
        userId: user.id,
        spotId: spot.id,
        review,
        stars,
      });
      res.status(200).json(newReview);
    }
  }
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
  else res.status(200).json(reviews);
});

// Create New Booking for Specific Spot
router.post("/:spotId/bookings", [restoreUser, requireAuth, validateBooking], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    const { startDate, endDate } = req.body;
    const bookedDates = await Booking.findAll({
      where: { spotId: spot.id },
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
      res.status(403).json("Owers Cannot Book Their Own Spots");
    }
  }
});

// Get all Bookings of Specific Spot
router.get("/:spotId/bookings", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    let bookings;
    const bookingsObj = [];

    if (user.id === spot.ownerId) {
      bookings = await Booking.unscoped().findAll({
        where: {
          spotId: req.params.spotId,
        },
        include: { model: User, attributes: ["id", "firstName", "lastName"] },
      });
      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i].toJSON();
        const { id, spotId, userId, startDate, endDate, createdAt, updatedAt, User } = booking;
        const newBooking = { User, id, spotId, userId, startDate, endDate, createdAt, updatedAt };
        bookingsObj.push(newBooking);
      }
      res.status(200).json({ Booking: bookingsObj });
    } else {
      bookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId,
        },
      });
      res.status(200).json({ Booking: bookings });
    }
  }
});

module.exports = router;
