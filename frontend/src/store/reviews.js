import { csrfFetch } from "./csrf";

//////////// Action Types //////////////////

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const LOAD_SINGLE_REVIEW = "reviews/LOAD_SINGLE_REVIEW";
export const POST_REVIEW = "reviews/POST_REVIEW";
export const CLEAR_REVIEWS = "reviews/CLEAR_REVIEWS";
//////////// Action Creators ///////////////

// get all reviews on render
export const loadReviewsAction = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

// get single review and add to list
export const loadReview = (review) => ({
  type: LOAD_SINGLE_REVIEW,
  review,
});

// post review
export const postReviewAction = (review) => ({
  type: POST_REVIEW,
  review,
});

// clear reviews state
export const clearReviewsAction = () => ({
  type: CLEAR_REVIEWS,
});

//////////// Thunks //////////////////

// get reviews
export const loadReviewsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviewsAction(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

// post review
export const postReviewThunk = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postReviewAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const reviewsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS:
      newState = { ...state };
      console.log("newState #1 👉👉👉👉👉👉", newState)
      console.log("action.reviews 👉", action.reviews)
      action.reviews.forEach((review) => {
        // console.log("test arino", review)
        newState[review.id] = review;
      });
      return newState;
    case POST_REVIEW:
      console.log("potato! =>", {...state})
      newState = { ...state, [action.review.id]: action.review };
      console.log("newState #2 👉", newState)
      return newState;
    case CLEAR_REVIEWS:
      return {};
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
