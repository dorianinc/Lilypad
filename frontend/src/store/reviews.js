import { csrfFetch } from "./csrf";

//////////// Action Types //////////////////

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

//////////// Action Creators ///////////////

export const loadReviewsAction = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

//////////// Thunks //////////////////

export const loadReviewsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviewsAction(data));
  }
};

const reviewsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS:
      newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;

// case CLEAR_REVIEWS:
// return {};
//   case PREVIEW_SPOT:
//     return { ...state, [action.spot.id]: action.spot };
//   case UPDATE_SPOT:
//     return { ...state, [action.spot.id]: action.spot };
//   case DELETE_SPOT:
//     newState = { ...state };
//     delete newState[action.spotId];
//     return newState;
