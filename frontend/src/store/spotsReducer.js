import { csrfFetch } from "./csrf";

////////////// Action Creators ///////////////

export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT";
export const CLEAR_SPOTS = "spots/CLEAR_SPOTS";

///////////// Action Creators ///////////////

// get all spots
export const getSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});
// get single spot
export const getSingleSpot = (spot) => ({
  type: GET_SINGLE_SPOT,
  spot,
});

// clear spots state
export const clearSpots = () => ({
  type: CLEAR_SPOTS,
});

/////////////////// Thunks ///////////////////

// get all spots
export const getSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    dispatch(getSpots(data));
    return data;
  }
};

// get user's spots
export const getUserSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(getSpots(data));
  }
};

// get spot details of single spot
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getSingleSpot(data));
    return data;
  }
};

// post a spot
export const createSpotThunk = (spot) => async () => {
  const res = await csrfFetch("/api/spots/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (!res.ok && res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  }
};

// post image to spot
export const addImageThunk = (spotId, imageObjects) => async (dispatch) => {
  if (imageObjects && imageObjects.length !== 0) {
    for (let i = 0; i < imageObjects.length; i++) {
      const formData = new FormData();
      let previewStatus = imageObjects[i].preview;
      let image = imageObjects[i].image;
      formData.append("preview", previewStatus);
      formData.append("image", image);
      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!res.ok) {
        return false;
      }
    }
    await dispatch(getSingleSpotThunk(spotId));
    return true;
  }
};

// update a spot
export const updateSpotThunk = (spotId, spotEdits) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotEdits),
  });

  if (res.ok) {
    dispatch(getSingleSpotThunk(spotId));
  }
};

// delete a spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(getUserSpotsThunk());
  }
};

const spotsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case GET_SINGLE_SPOT:
      newState = {};
      newState = { ...action.spot };
      return newState;
    case CLEAR_SPOTS:
      return {};
    default:
      return state;
  }
};

export default spotsReducer;
