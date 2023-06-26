////////////// Action Creators ///////////////
export const GET_BOOKINGS = "bookings/GET_BOOKINGS";

///////////// Action Creators ///////////////
// get all bookings
export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

/////////////////// Thunks ///////////////////
// get all bookings for specific spot
export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/bookings`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data));
    return data;
  }
};

// get all users bookings
export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await fetch("/api/bookings");
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data));
    return data;
  }
};

// edit a booking
export const updateBookingsThunk = (bookingId) => async (dispatch) => {
  const res = await fetch(`/api/bookings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingId),
  });
  if (res.ok) {
    dispatch(getUserBookingsThunk());
  }
};

const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKINGS:
      newState = {};
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
