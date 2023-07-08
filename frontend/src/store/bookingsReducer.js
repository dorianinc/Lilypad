import { csrfFetch } from "./csrf";
import { addDays } from "date-fns";

////////////// Action Creators ///////////////
export const GET_BOOKINGS = "bookings/GET_BOOKINGS";
export const GET_SINGLE_BOOKING = "trails/GET_SINGLE_BOOKING";
export const CLEAR_BOOKINGS = "spots/CLEAR_BOOKINGS";

///////////// Action Creators ///////////////
// get all bookings
export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings,
});

// get single booking
export const getSingleBooking = (booking) => ({
  type: GET_SINGLE_BOOKING,
  booking,
});

// clear spots state
export const clearBookings = () => ({
  type: CLEAR_BOOKINGS,
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

// get all user's bookings
export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await fetch("/api/bookings");
  if (res.ok) {
    const data = await res.json();
    dispatch(getBookings(data));
    return data;
  }
};

// get booking by id
export const getSingleBookingsThunk = (bookingId) => async (dispatch) => {
  const res = await fetch(`/api/bookings/${bookingId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getSingleBooking(data));
    return data;
  }
};

// create a booking
export const createBookingsThunk = (spotId, booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

// delete a list
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    dispatch(getUserBookingsThunk());
  }
};

// edit a booking
export const updateBookingsThunk = (bookingId, booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });
  if (res.ok) {
    dispatch(getSingleBookingsThunk(bookingId));
  }
};

const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_BOOKINGS:
      newState = {};
      action.bookings.forEach((booking) => {
        booking.startDate = addDays(new Date(booking.startDate), 1);
        booking.endDate = addDays(new Date(booking.endDate), 1);
        newState[booking.id] = booking;
      });
      return newState;
    case GET_SINGLE_BOOKING:
      newState = {};
      action.booking.startDate = addDays(new Date(action.booking.startDate), 1);
      action.booking.endDate = addDays(new Date(action.booking.endDate), 1);
      newState = action.booking;
      return newState;
    case CLEAR_BOOKINGS:
      return {};
    default:
      return state;
  }
};

export default bookingsReducer;
