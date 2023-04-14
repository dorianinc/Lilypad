import { csrfFetch } from "./csrf";

////////////// Action Creators ///////////////

export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const PREVIEW_SPOT = "spots/PREVIEW_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";
export const CLEAR_SPOTS = "spots/CLEAR_SPOTS";

///////////// Action Creators ///////////////

// get all spots
export const loadSpotsAction = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
// get single spot
export const previewSpotAction = (spot) => ({
  type: PREVIEW_SPOT,
  spot,
});

// update single spot
export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

//// delete single spot
export const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

// clear all spots 
export const clearSpotsAction = () => ({
  type: CLEAR_SPOTS,
});

/////////////////// Thunks ///////////////////

// get all spots
export const loadSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    const allSpots = data.Spots;
    dispatch(loadSpotsAction(allSpots));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// get user's spots
export const loadUserSpotsThunk = (userId) => async (dispatch) => {
  const res = await fetch("/api/spots/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotsAction(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};
// delete a spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteSpotAction(spotId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

// get spot details of one spot
export const previewSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(previewSpotAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};
// post a spot
export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// post image to spot
export const addImageThunk = (spotId, imageObj) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageObj),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// update a spot
export const updateSpotThunk = (spot, spotEdits) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotEdits),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateSpotAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case PREVIEW_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case UPDATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case DELETE_SPOT:
      newState = { ...state };
      delete newState[action.spotId];
      return newState;
    case CLEAR_SPOTS:
      return {};
    default:
      return state;
  }
};

export default spotsReducer;
