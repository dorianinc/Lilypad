import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleSpotThunk } from "../../../store/spotsReducer";
import { getReviewsThunk, clearReviews } from "../../../store/reviewsReducer";
import ModalButton from "../../Modals/ModalButton";
import BookingForm from "../../Bookings/BookingForm";
import CreateReviewModal from "../../Modals/CreateReviewModal/CreateReview";
import DeleteReviewModal from "../../Modals/DeleteReviewModal/DeleteReviewModal";
import "./SpotDetails.css";

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch, spotId]);

  const reviews = useSelector((state) => Object.values(state.reviews).reverse());

  // find user then check if user has left a review
  let hasReviewed = false;
  const user = useSelector((state) => state.session.user);
  if (user) {
    if (reviews.find((review) => review.userId === user.id)) {
      hasReviewed = true;
    }
  }

  const dates = reviews.map((review) =>
    new Date(review.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
    })
  );

  if (!spot || !spot.owner) return null;
  return (
    <div className="spot-details-container">
      <h1 className="content-header">{spot.name}</h1>
      <h2 className="content-sub-header">
        {spot.city}, {spot.state} {" - "} {spot.country}
      </h2>
      <div className="spot-details-images">
        <div className="preview-image-container" id="box-1">
          <img alt="preview" loading="lazy" src={spot.previewImage} />
        </div>
        {spot.images.map((image, i) => (
          <div className="support-images" key={i}>
            <img className="supportingImages" alt={i} loading="lazy" src={image} />
          </div>
        ))}
      </div>
      <div className="spot-details-menu">
        <div className="spot-details-info">
          <h2>
            Hosted By: {spot.owner.firstName} {spot.owner.lastName}
          </h2>
          <p id="spot-description-info">{spot.description}</p>
        </div>
        <div className="reserve-section">
          <div id="price-and-rating">
            <p id="spotPrice">
              <span>${Number(spot.price).toFixed(2)}</span> night
            </p>
            <p id="spotRating">
              <i className="fa-solid fa-star" />
              {Number(spot.avgStarRating) ? " " + Number(spot.avgStarRating).toFixed(2) : " New"}
              {Number(spot.numReviews) === 1
                ? ` · ${spot.numReviews} review`
                : spot.numReviews < 1
                ? null
                : ` · ${spot.numReviews} reviews`}
            </p>
          </div>
          <BookingForm spot={spot} action="create" />
        </div>
      </div>
      <hr className="lines spot-details" />
      <div className="reviews-container">
        <h2>
          <i className="fa-solid fa-star" />
          {Number(spot.avgStarRating) ? " " + Number(spot.avgStarRating).toFixed(2) : " New"}
          {Number(spot.numReviews) === 1
            ? ` · ${spot.numReviews} review`
            : spot.numReviews < 1
            ? null
            : ` · ${spot.numReviews} reviews`}
        </h2>
        {!user ? null : user.id && user.id !== spot.owner.id && !hasReviewed ? (
          <ModalButton
            buttonContent={
              <button className="grey-button review">
                <p>Post your review</p>
              </button>
            }
            modalComponent={<CreateReviewModal spotId={spotId} />}
          />
        ) : null}
        {!!reviews.length ? (
          reviews.map((review, i) => (
            <div className="reviewStatement" key={review.id}>
              <h3>
                {review.User.firstName} {review.User.lastName}
              </h3>
              <h3 style={{ color: "lightgray" }}>{dates[i]}</h3>
              <p>{review.review}</p>
              {!user ? null : user.id === review.userId ? (
                <ModalButton
                  buttonContent={
                    <button className="grey-button delete">
                      <p>Delete</p>
                    </button>
                  }
                  modalComponent={<DeleteReviewModal reviewId={review.id} />}
                />
              ) : null}
            </div>
          ))
        ) : !user ? (
          <div>Be the First to Review!</div>
        ) : user.id !== spot.owner.id ? (
          <div>Be the First to Review!</div>
        ) : null}
      </div>
    </div>
  );
}

export default SpotPage;
