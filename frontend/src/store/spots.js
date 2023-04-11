/** Action Type Constants: */
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const PREVIEW_SPOT = "spots/PREVIEW_SPOT";
export const CLEAR_SPOTS = "spots/CLEAR_SPOTS";
// export const UPDATE_SPOTS = "spots/UPDATE_SPOTS";
// export const REMOVE_SPOTS = "spots/REMOVE_SPOTS";
// export const ADD_SPOTS = "spots/ADD_SPOTS";

/**  Action Creators: */
export const loadSpotsAction = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const previewSpotAction = (spot) => ({
  type: PREVIEW_SPOT,
  spot,
});

// export const editReport = (spot) => ({
//   type: UPDATE_SPOTS,
//   spot,
// });

// export const removeReport = (spotId) => ({
//   type: REMOVE_SPOTS,
//   spotId,
// });

export const clearSpots = () => ({
  type: CLEAR_SPOTS,
});

/** Thunk Action Creators: */

export const loadSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    const allSpots = data.Spots;
    dispatch(loadSpotsAction(allSpots));
    return data;
  }
};

// export const removeSingleReport = (spotId) => async (dispatch) => {
//   console.log("before the fetch")
//   const res = await fetch(`/api/spots/${spotId}`, {
//     method: "DELETE"
//   });
//   if (res.ok) {
//     dispatch(removeReport(spotId));
//   }
// };

export const previewSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(previewSpotAction(data));
    return data;
  }
};

// export const createReport = (spot) => async (dispatch) => {
//   // console.log("before fetch")
//   const res = await fetch('/api/spots/', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(spot)
//   })
//   // console.log("after fetch")
//   if(res.ok){
//     console.log("res is okay")
//     const data = await res.json();
//     // console.log("data 👉", data)
//     dispatch(receiveReport(data))
//     return data
//   }

// }

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
    case CLEAR_SPOTS:
      return {};
    default:
      return state;
  }
};

export default spotsReducer;

// const spotsReducer = (state = {}, action) => {
//     switch (action.type) {
//       case LOAD_SPOTS:
//         const spotsState = {};
//         action.spots.forEach((spot) => {
//           spotsState[spot.id] = spot;
//         });
//         return spotsState;
//       case RECEIVE_SPOTS:
//         return { ...state, [action.spot.id]: action.spot };
//       case UPDATE_SPOTS:
//         return { ...state, [action.spot.id]: action.spot };
//       case REMOVE_SPOTS:
//         const newState = { ...state };
//         delete newState[action.spotId];
//         return newState;
//       default:
//         return state;
//     }
//   };
