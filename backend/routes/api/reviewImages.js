const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const {  doesNotExist } = require("../../utils/helpers.js");
const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();

// Delete an Image from a Review
router.delete("/:imageId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const image = await ReviewImage.findByPk(req.params.imageId);
  if (!image) res.status(404).json(doesNotExist("Review Image"));
  else {
    const review = await Review.findOne({ where: { id: image.reviewId }, raw: true });
    if (isAuthorized(user.id, review.userId, res)) {
      await image.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
});
module.exports = router;
