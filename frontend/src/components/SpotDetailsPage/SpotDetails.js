import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleSpotThunk, clearSpots } from "../../store/spotsReducer";
import { getReviewsThunk, clearReviews } from "../../store/reviewsReducer";
import OpenModalButton from "../Modals/OpenModalButton/OpenModal";
import Bookings from "../Bookings";
import CreateReviewModal from "../Modals/CreateReviewModal/CreateReview";
import DeleteReviewModal from "../Modals/DeleteReviewModal/DeleteReviewModal";
import { useCalendar } from "../../context/CalendarContext";
import "./SpotDetails.css";

function SpotPage() {
  const { spotId } = useParams();
  const { startDate, endDate } = useCalendar();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots);
  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
    return () => {
      dispatch(clearSpots());
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

  if (!spot || !spot.Owner) return null;

  // finds one preview image to set as main image and then add the rest to an array
  const previewImage = spot.SpotImages.find((image) => {
    return image.preview === true || image.preview === 1;
  });
  const imageArray = spot.SpotImages.filter((image) => {
    return image.id !== previewImage.id;
  });

  return (
    <div className="mainContainer spotDetails">
      <h1>{spot.name}</h1>
      <h2>
        {spot.city}, {spot.state} {" - "} {spot.country}
      </h2>
      <div className="imagesContainer">
        <div className="previewImage" id="box-1">
          <img alt="preview" src={previewImage?.url} />
        </div>
        {imageArray.map((image) => (
          <div className="supportImages" key={`box-${image.id}`}>
            <img className="supportingImages" alt={image.id} src={image.url} />
          </div>
        ))}
      </div>
      <div className="spotMenu">
        <div className="spotInfo">
          <h2>
            Hosted By: {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p id="spotDescription">{spot.description}</p>
        </div>
        <div className="reserveSection">
          <div id="priceAndRating">
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
          <Bookings spotId={spotId} />
        </div>
      </div>
      <hr className="lines spotDetails" />
      <div className="reviewsContainer">
        <h2>
          <i className="fa-solid fa-star" />
          {Number(spot.avgStarRating) ? " " + Number(spot.avgStarRating).toFixed(2) : " New"}
          {Number(spot.numReviews) === 1
            ? ` · ${spot.numReviews} review`
            : spot.numReviews < 1
            ? null
            : ` · ${spot.numReviews} reviews`}
        </h2>
        {!user ? null : user.id && user.id !== spot.Owner.id && !hasReviewed ? (
          <OpenModalButton
            className="grey-button review"
            buttonText="Post your Review"
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
                <OpenModalButton
                  className="grey-button delete"
                  buttonText="Delete"
                  modalComponent={<DeleteReviewModal reviewId={review.id} />}
                />
              ) : null}
            </div>
          ))
        ) : !user ? (
          <div>Be the First to Review!</div>
        ) : user.id !== spot.Owner.id ? (
          <div>Be the First to Review!</div>
        ) : null}
      </div>
    </div>
  );
}

export default SpotPage;
