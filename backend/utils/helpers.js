const isAvailable = (booking, bookedDates, res) => {
  const errorHandler = {
    message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {},
  };
  const bookingIdKey = Number(booking.bookingId);
  const requestedStart = new Date(booking.startDate).getTime();
  const requestedEnd = new Date(booking.endDate).getTime();

  for (let i = 0; i < bookedDates.length; i++) {
    let bookingId = bookedDates[i].id;
    let bookedStartDate = new Date(bookedDates[i].startDate).getTime();
    let bookedEndDate = new Date(bookedDates[i].endDate).getTime();

    if (requestedStart >= bookedStartDate && requestedStart <= bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.startDate = "Start date conflicts with an existing booking";
      }
    }
    if (requestedEnd >= bookedStartDate && requestedEnd <= bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.endDate = "End date conflicts with an existing booking";
      }
    }
    if (requestedStart < bookedStartDate && requestedEnd > bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.startDate = "Start date conflicts with an existing booking";
        errorHandler.errors.endDate = "End date conflicts with an existing booking";
      }
    }
  }
  if (Object.values(errorHandler.errors).length) {
    res.status(403).json(errorHandler);
    return false;
  } else return true;
};

const doesNotExist = (object) => {
  return {
    message: `${object} couldn't be found`,
  };
};

const hasPassed = (startDate, endDate, res) => {
  if (startDate) {
    if (new Date(startDate).getTime() <= new Date().getTime()) {
      res.status(400).json({
        message: "Bookings that have been started can't be deleted",
      });
      return true;
    }
  }
  if (endDate) {
    if (new Date(endDate).getTime() < new Date().getTime()) {
      res.status(400).json({
        message: "Past bookings can't be modified",
      });
      return true;
    }
  }
};

module.exports = {
  isAvailable,
  doesNotExist,
  hasPassed,
};
