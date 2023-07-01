const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist, hasPassed } = require("../../utils/utilities.js");
const { Booking, Spot, SpotImage, User } = require("../../db/models");

const router = express.Router();

// Get all Bookings of Current User
router.get("/", [restoreUser, requireAuth], async (req, res) => {
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
    const owner = await User.findOne({
      where: {
        id: booking.Spot.ownerId,
      },
      attributes: ["id", "firstName", "lastName"],
      raw: true,
    });
    if(owner) booking.Spot.owner = {
      firstName: owner.firstName,
      lastName: owner.lastName
    }
    for (let j = 0; j < booking.Spot.SpotImages.length; j++) {
      const image = booking.Spot.SpotImages[j];
      if (image.preview === true) {
        booking.Spot.previewImage = image.url;
      }else{
        booking.Spot.images = image.url
      }
    }
    if (!booking.Spot.previewImage) {
      booking.Spot.previewImage = "image url";
    }
    delete booking.Spot.SpotImages;
  }

  res.status(200).json(bookingsObj);
});

// Get single Booking
router.get("/:bookingId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const booking = await Booking.unscoped().findByPk(req.params.bookingId,{
    where: {
      userId: user.id,
    },
    include: {
      model: Spot,
      include: { model: SpotImage },
    }
  });
  if (!booking) res.status(404).json(doesNotExist("Booking"));
  else{
    if (isAuthorized(user.id, booking.userId, res)) {
      res.status(200).json(booking);
    }
  }
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
  else {
    if (!hasPassed(null, booking.endDate, res)) {
      const bookedDates = await Booking.findAll({
        attributes: ["id", "startDate", "endDate"],
        raw: true,
      });
      if (isAuthorized(user.id, booking.userId, res)) {
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
  }
});

// Delete a Booking
router.delete("/:bookingId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const booking = await Booking.unscoped().findByPk(req.params.bookingId);
  if (!booking) res.status(404).json(doesNotExist("Booking"));
  else{
    if (isAuthorized(user.id, booking.userId, res)) {
      if (!hasPassed(booking.startDate, null, res)) {
        await booking.destroy();
        res.status(200).json({
          message: "Successfully deleted",
          statusCode: 200,
        });
      }
    }
  }
});

module.exports = router;
