const express = require("express");
const { check } = require("express-validator");
const { validateSpot, validateReview } = require("../../utils/validation");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { ReviewImage, Review, User, Spot } = require("../../db/models");

const router = express.Router();

// add image to a review through review id
router.post("/:reviewId/images", [restoreUser, requireAuth], async (req, res, next) => {
  const { user } = req;
  const { url } = req.body;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }

  const userId = user.id;
  const review = await Review.findByPk(req.params.reviewId, { raw: true });
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (userId !== review.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  let imageCount = await ReviewImage.count("url", {
    where: {
      reviewId: review.id,
    },
  });
  if (imageCount > 10) {
    res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  const newImage = await ReviewImage.create({
    url,
    reviewId: review.id,
  });
  res.status(201);
  res.json(newImage);
});

// get all reviews of current user
router.get("/current", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: {
      userId: user.id,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ["reviewId", "createdAt", "updatedAt"],
        },
      },
    ],
  });
  const reviewObj = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    reviewObj.push(review.toJSON());
  }

  for (let i = 0; i < reviewObj.length; i++) {
    const spotObj = reviewObj[i].Spot;
    const imgObj = reviewObj[i].ReviewImages;

    if (imgObj.length) spotObj.previewImage = imgObj[0].url;
    else spotObj.previewImage = "image url";
  }

  res.status(200).json({ Reviews: reviewObj });
});



// edit review by id
router.put("/:reviewId", [restoreUser, requireAuth, validateReview], async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }

  const userId = user.id;
  const review = await Review.findByPk(req.params.reviewId);
  if (!review)
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  for (property in req.body) {
    let value = req.body[property];
    review[property] = value;
  }
  if (userId !== review.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  await review.save();
  res.status(200).json(review);
});


module.exports = router;
