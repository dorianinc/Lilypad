const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();

// Delete an Image from a Spot
router.delete("/:imageId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const image = await SpotImage.findByPk(req.params.imageId);
  if (!image) res.status(404).json(doesNotExist("Spot Image"));
  else {
    const spot = await Spot.findOne({ where: { id: image.spotId }, raw: true });
    if (isAuthorized(user.id, spot.ownerId, res)) {
      await image.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
});

module.exports = router;
