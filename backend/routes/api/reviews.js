const express = require("express");
const { validateReview } = require("../../utils/validation");
const {  doesNotExist } = require("../../utils/helpers.js");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { ReviewImage, Review, User, Spot } = require("../../db/models");

const router = express.Router();

// Add Image to Review
router.post("/:reviewId/images", [restoreUser, requireAuth], async (req, res, next) => {
  const { user } = req;
  const { url } = req.body;

  const review = await Review.findByPk(req.params.reviewId, { raw: true });
  if (!review) res.status(404).json(doesNotExist("Review"));
  else {
    if (isAuthorized(user.id, review.userId, res)) {
      let imageCount = await ReviewImage.count({
        where: {
          reviewId: review.id,
        },
      });
      if (imageCount > 10) {
        res.status(403).json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403,
        });
      } else {
        const newImage = await ReviewImage.create({
          url,
          reviewId: review.id,
        });
        res.status(200).json(newImage);
      }
    }
  }
});

// Get all Reviews of Current User
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
          exclude: ["description", "createdAt", "updatedAt"],
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

// Update a Review
router.put("/:reviewId", [restoreUser, requireAuth, validateReview], async (req, res) => {
  const { user } = req;

  const review = await Review.findByPk(req.params.reviewId);
  if (!review) res.status(404).json(doesNotExist("Review"));
  else {
    if (isAuthorized(user.id, review.userId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        review[property] = value;
      }
      await review.save();
      res.status(200).json(review);
    }
  }
});

// Delete a Review
router.delete("/:reviewId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const review = await Review.findByPk(req.params.reviewId);
  if (!review) res.status(404).json(doesNotExist("Review"));
  else {
    if (isAuthorized(user.id, review.userId, res)) {
      await review.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
});

module.exports = router;
