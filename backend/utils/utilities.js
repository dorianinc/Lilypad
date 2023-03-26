const isAvailable = (startDate, endDate, bookedDates, res) => {
  const errorHandler = {
    message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {},
  };
  const requestedStart = new Date(startDate).getTime();
  const requestedEnd = new Date(endDate).getTime();

  for (let i = 0; i < bookedDates.length; i++) {
    let bookedStartDate = new Date(bookedDates[i].startDate).getTime();
    let bookedEndDate = new Date(bookedDates[i].endDate).getTime();
    if (requestedStart >= bookedStartDate && requestedStart <= bookedEndDate) {
      errorHandler.errors.startDate = "Start date conflicts with an existing booking";
    }
    if (requestedEnd >= bookedStartDate && requestedEnd <= bookedEndDate) {
      errorHandler.errors.endDate = "End date conflicts with an existing booking";
    }
    if (requestedStart < bookedStartDate && requestedEnd > bookedEndDate) {
      errorHandler.errors.startDate = "Start date conflicts with an existing booking";
      errorHandler.errors.endDate = "End date conflicts with an existing booking";
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
    statusCode: 404,
  };
};

const hasPassed = (endDate, res) => {
  if (new Date(endDate).getTime() < new Date().getTime()) {
    res.status(400).json({
      message: "Past bookings can't be modified",
    });
    return true;
  }
};

module.exports = {
  isAvailable,
  doesNotExist,
  hasPassed
};
