import { csrfFetch } from "./csrf";

////////////// Action Creators ////////////////

export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const POST_REVIEW = "reviews/POST_REVIEW";
export const DELETE_REVIEW = "spots/DELETE_REVIEW";
export const CLEAR_REVIEWS = "reviews/CLEAR_REVIEWS";

///////////// Action Creators ///////////////

// get all reviews
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

// post review
export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

//// delete single spot
export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// clear reviews state
export const clearReviews = () => ({
  type: CLEAR_REVIEWS,
});

/////////////////// Thunks ///////////////////

// get all reviews
export const getReviewsThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getReviews(data));
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
    dispatch(postReview(data));
    return res;
  }
};

// delete a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

const reviewsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
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