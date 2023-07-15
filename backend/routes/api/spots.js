const express = require("express");
const {
  validateSpot,
  validateReview,
  validateBooking,
  validateQueries,
} = require("../../utils/validation");
const validators = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist, getName } = require("../../utils/helpers.js");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3.js");
const { Op } = require("sequelize");
const router = express.Router();

// Get all Spots
router.get("/", validateQueries, async (req, res) => {
  //  start of querying settings //
  ////////// start of page and size logic /////////////
  let { page, size } = req.query;

  // set defaults for page and sizes
  if (!page) page = 1;
  if (!size) size = 25;

  // convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // declare limits for page and size
  if (page > 10) page = 10;
  if (size > 20) size = 25;

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

    const owner = await User.findOne({
      where: {
        id: spot.ownerId,
      },
      attributes: ["id", "firstName", "lastName"],
      raw: true,
    });
    spot.owner = owner;

    const imagesArr = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
      raw: true,
    });

    const previewImage = imagesArr.filter(
      (image) => image.preview === 1 || image.preview === true
    )[0];

    const images = imagesArr.reduce((filtered, image) => {
      if (image.id !== previewImage.id) {
        filtered.push(image.url);
      }
      return filtered;
    }, []);

    if (images) spot.images = images;
    if (previewImage) spot.previewImage = previewImage.url;
    else spot.previewImage = "image url";
  }

  res.status(200).json(spots);
  // res.status(200).json({ Spots: spots, page, size });
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
  }

  res.status(200).json(spots);
});

// Get single spot Details
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

    const imagesArr = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
      raw: true,
    });

    const previewImage = imagesArr.filter(
      (image) => image.preview === 1 || image.preview === true
    )[0];

    if (previewImage) spot.previewImage = previewImage.url;
    else spot.previewImage = "image url";

    const images = imagesArr.reduce((filtered, image) => {
      if (image.id !== previewImage.id) {
        filtered.push(image.url);
      }
      return filtered;
    }, []);

    if (images) spot.images = images;

    const owner = await User.findOne({
      where: {
        id: spot.ownerId,
      },
      attributes: ["id", "firstName", "lastName"],
      raw: true,
    });
    spot.owner = owner;

    res.status(200).json(spot);
  }
});

// Create a new Spot
router.post("/", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;
  const data = { ownerId: user.id };

  for (property in req.body) {
    let value = req.body[property];
    if (property === "state") {
      data[property] = getName(value, false);
    } else if (property === "country") {
      data[property] = getName(value, true);
    } else {
      data[property] = value;
    }
  }
  
  const newSpot = await Spot.create({ ...reqData });
  res.status(201).json(newSpot);
});

// Add Image to a Spot
router.post(
  "/:spotId/images",
  [singleMulterUpload("image"), restoreUser, requireAuth],
  async (req, res) => {
    const { user } = req;
    const { preview } = req.body;
    const imageUrl = await singlePublicFileUpload(req.file);
    const spot = await Spot.findByPk(req.params.spotId, { raw: true });
    if (!spot) res.status(404).json(doesNotExist("Spot"));
    else {
      if (isAuthorized(user.id, spot.ownerId, res)) {
        const newImage = await SpotImage.create({
          url: imageUrl,
          preview: true,
          spotId: spot.id,
        });
        res.status(200).json(newImage);
      } else {
        res.status(403).json({
          message: "Forbidden",
          statusCode: 403,
        });
      }
    }
  }
);

// Update a Spot
router.put("/:spotId", [restoreUser, requireAuth, validateSpot], async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    if (isAuthorized(user.id, spot.ownerId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        if (property === "state") {
          spot[property] = getName(value, false);
        } else if (property === "country") {
          spot[property] = getName(value, true);
        } else {
          spot[property] = value;
        }
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
      return res.status(500).json({
        errors: { review: "User already has a review for this spot" },
        statusCode: 500,
      });
    } else {
      const newReview = await Review.create({
        userId: user.id,
        spotId: spot.id,
        review,
        stars,
      });
      const reviewJSON = newReview.toJSON();
      reviewJSON.User = user;
      res.status(200).json(reviewJSON);
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
    order: [["createdAt", "DESC"]],
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
    const { startDate, endDate, numNights, numAdults, numChildren, numInfants } = req.body;
    const bookedDates = await Booking.findAll({
      where: { spotId: spot.id },
      attributes: ["id", "startDate", "endDate"],
      raw: true,
    });
    if (user.id !== spot.ownerId) {
      const bookingRequest = { startDate, endDate };
      if (isAvailable(bookingRequest, bookedDates, res)) {
        const newBooking = await Booking.create({
          spotId: spot.id,
          userId: user.id,
          startDate,
          endDate,
          numNights,
          numAdults,
          numChildren,
          numInfants,
        });
        res.status(200).json(newBooking);
      }
    } else {
      res.status(403).json("Owers Cannot Book Their Own Spots");
    }
  }
});

// Get all Bookings of Specific Spot
router.get("/:spotId/bookings", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, { raw: true });
  if (!spot) res.status(404).json(doesNotExist("Spot"));
  else {
    bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: {
        exclude: ["numAdults", "numChildren", "numInfants"],
      },
    });
    res.status(200).json(bookings);
  }
});

module.exports = router;
