import { csrfFetch } from "./csrf";
import { getSpotBookingsThunk, getUserBookingsThunk } from "./bookingsReducer";

////////////// Action Creators ///////////////
export const GET_GUESTLIST = "guestLists/GET_GUESTLISTS";
///////////// Action Creators ///////////////
// get single guestList
export const getGuestList = (guestList) => ({
  type: GET_GUESTLIST,
  guestList,
});

/////////////////// Thunks ///////////////////
// get guestlist by id
export const getGuestListsThunk = (guestListId) => async (dispatch) => {
  const res = await fetch(`/api/guestlist/${guestListId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getGuestList(data));
    return data;
  }
};
// create a guestlist
export const createGuestListsThunk = (booking, guestList) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${booking.id}/guestlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestList),
  });
  if (res.ok) {
    await dispatch(getSpotBookingsThunk(booking.spotId))
  }
};
// delete a guestlist
export const deleteGuestListThunk = (guestListId) => async (dispatch) => {
  const res = await csrfFetch(`/api/guestlist/${guestListId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    dispatch(getUserBookingsThunk());
  }
};

// // edit a guestList
// export const updateGuestListsThunk = (guestListId) => async (dispatch) => {
//   const res = await fetch(`/api/guestLists`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(guestListId),
//   });
//   if (res.ok) {
//     dispatch(getUserGuestListsThunk());
//   }
// };

const guestListsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_GUESTLIST:
      newState = {};
      action.guestLists.forEach((guestList) => {
        newState[guestList.id] = guestList;
      });
      return newState;
    default:
      return state;
  }
};

export default guestListsReducer;
