import { csrfFetch } from "./csrf";

////////////// Action Creators ////////////////

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const LOAD_SINGLE_REVIEW = "reviews/LOAD_SINGLE_REVIEW";
export const POST_REVIEW = "reviews/POST_REVIEW";
export const DELETE_REVIEW = "spots/DELETE_REVIEW";
export const CLEAR_REVIEWS = "reviews/CLEAR_REVIEWS";

///////////// Action Creators ///////////////

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

//// delete single spot
export const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// clear reviews state
export const clearReviewsAction = () => ({
  type: CLEAR_REVIEWS,
});

/////////////////// Thunks ///////////////////

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
    return res;
  }
};

// delete a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReviewAction(reviewId));
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
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case POST_REVIEW:
      newState = { ...state, [action.review.id]: action.review };
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.reviewId];
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
