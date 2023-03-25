const express = require("express");
const { body } = require("express-validator");
const { checkAvailability } = require("../../utils/validation");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");

const router = express.Router();

router.get("/current", async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({
      message: "Authentication required",
      statusCode: 401,
    });
  }

  const bookings = await Booking.unscoped().findAll({
    where: {
      userId: user.id,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["description"],
      },
      include: { model: SpotImage },
    },
  });

  const bookingsObj = [];
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i].toJSON();
    const { id, spotId, userId, startDate, endDate, createdAt, updatedAt, Spot } = booking;
    const newBooking = { id, spotId, Spot, userId, startDate, endDate, createdAt, updatedAt };
    bookingsObj.push(newBooking);
  }
  for (let i = 0; i < bookingsObj.length; i++) {
    const booking = bookingsObj[i];
    for (let j = 0; j < booking.Spot.SpotImages.length; j++) {
      const image = booking.Spot.SpotImages[j];
      if (image.preview === true) {
        booking.Spot.previewImage = image.url;
      }
    }
    if (!booking.Spot.previewImage) {
      booking.Spot.previewImage = "No Image Available";
    }
    delete booking.Spot.SpotImages;
  }

  res.json({ Bookings: bookingsObj });
});

module.exports = router;
