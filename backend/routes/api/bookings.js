const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist, hasPassed } = require("../../utils/utilities.js");
const { Booking, Spot, SpotImage } = require("../../db/models");

const router = express.Router();

// Get all Bookings of Current User
router.get("/current", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

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

  res.status(200).json({ Bookings: bookingsObj });
});

// Update a Booking
router.put("/:bookingId", [restoreUser, requireAuth, validateBooking], async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;

  const booking = await Booking.unscoped().findByPk(req.params.bookingId, {
    where: {
      id: req.params.bookingId,
    },
  });
  if (!booking) res.status(404).json(doesNotExist("Booking"));

  if (!hasPassed(booking.endDate, res)) {
    const bookedDates = await Booking.findAll({
      attributes: ["id", "startDate", "endDate"],
      raw: true,
    });
    
    if (isAuthorized(booking.userId, user.id, res)) {
      if (isAvailable(startDate, endDate, bookedDates, res)) {
        for (property in req.body) {
          let value = req.body[property];
          booking[property] = value;
        }
        await booking.save();
        res.status(200).json(booking);
      }
    }
  }
});

module.exports = router;
