const express = require("express");
const { validateBooking } = require("../../utils/validation");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { isAvailable, doesNotExist, hasPassed } = require("../../utils/helpers.js");
const { Booking, Spot, SpotImage, User } = require("../../db/models");

const router = express.Router();

// Get all Bookings of Current User
router.get("/", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;

  const bookings = await Booking.findAll({
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

    const {
      id,
      spotId,
      userId,
      startDate,
      endDate,
      numNights,
      numAdults,
      numChildren,
      numInfants,
      Spot,
    } = booking;
    const {
      ownerId,
      address,
      city,
      state,
      lat,
      lng,
      name,
      price,
      minNights,
      maxGuests,
      SpotImages,
    } = Spot;
    const spot = {
      ownerId,
      address,
      city,
      state,
      lat,
      lng,
      name,
      price,
      minNights,
      maxGuests,
      SpotImages,
    };

    const newBooking = {
      id,
      spotId,
      userId,
      startDate,
      endDate,
      numNights,
      numAdults,
      numChildren,
      numInfants,
      spot,
    };
    bookingsObj.push(newBooking);
  }

  for (let i = 0; i < bookingsObj.length; i++) {
    const booking = bookingsObj[i];

    for (let j = 0; j < booking.spot.SpotImages.length; j++) {
      const image = booking.spot.SpotImages[j];
      if (image.preview === true) {
        booking.spot.previewImage = image.url;
      }
    }
    if (!booking.spot.previewImage) {
      booking.Spot.previewImage = "image url";
    }
    delete booking.spot.SpotImages;
    const owner = await User.findOne({
      where: {
        id: booking.spot.ownerId,
      },
      attributes: ["id", "firstName", "lastName"],
      raw: true,
    });
    if (owner)
      booking.spot.owner = {
        firstName: owner.firstName,
        lastName: owner.lastName,
      };
  }

  res.status(200).json(bookingsObj);
});

// Get single Booking
router.get("/:bookingId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const booking = await Booking.findByPk(req.params.bookingId, {
    where: {
      userId: user.id,
    },
    include: {
      model: Spot,
      include: { model: SpotImage },
    },
  });
  if (!booking) res.status(404).json(doesNotExist("Booking"));
  else {
    if (isAuthorized(user.id, booking.userId, res)) {
      const {
        id,
        spotId,
        userId,
        startDate,
        endDate,
        numNights,
        numAdults,
        numChildren,
        numInfants,
        Spot,
      } = booking.toJSON();
      const {
        ownerId,
        address,
        city,
        state,
        lat,
        lng,
        name,
        price,
        minNights,
        maxGuests,
        SpotImages,
      } = Spot;
      const spot = {
        ownerId,
        address,
        city,
        state,
        lat,
        lng,
        name,
        price,
        minNights,
        maxGuests,
        previewImage: SpotImages[0].url,
      };
      const newBooking = {
        id,
        spotId,
        userId,
        startDate,
        endDate,
        numNights,
        numAdults,
        numChildren,
        numInfants,
        spot,
      };

      res.status(200).json(newBooking);
    }
  }
});

// Update a Booking
router.put("/:bookingId", [restoreUser, requireAuth, validateBooking], async (req, res) => {
  const { user } = req;
  const bookingId = req.params.bookingId;
  const { startDate, endDate, numNights, numAdults, numChildren, numInfants, spotId } = req.body;

  const booking = await Booking.findByPk(bookingId, {
    where: {
      id: bookingId,
    },
  });
  if (!booking) res.status(404).json(doesNotExist("Booking"));
  else {
    if (!hasPassed(null, booking.endDate, res)) {
      const bookedDates = await Booking.findAll({
        where: {
          spotId: spotId,
        },
        attributes: ["id", "startDate", "endDate"],
        raw: true,
      });
      const bookingEdits = { startDate, endDate, bookingId };
      if (isAuthorized(user.id, booking.userId, res)) {
        if (isAvailable(bookingEdits, bookedDates, res)) {
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
  else {
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
