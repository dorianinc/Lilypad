import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleSpotThunk, clearSpots } from "../../store/spotsReducer";
import { getReviewsThunk, clearReviews } from "../../store/reviewsReducer";
import OpenModalButton from "../Modals/OpenModalButton/OpenModal";
import CreateReviewModal from "../Modals/CreateReviewModal/CreateReview";
import DeleteReviewModal from "../Modals/DeleteReviewModal/DeleteReviewModal";
import "./SpotDetails.css";

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState([]);
  let hasReviewed = false;

  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId)).then((spot) => {
      const prevImage = spot.SpotImages.find(
        (image) => image.preview === true || image.preview === 1
      );

      const imageArray = spot.SpotImages.filter((image) => image.id !== prevImage.id);
      setPreviewImage(prevImage);
      setImages(imageArray);
    });
    dispatch(getReviewsThunk(spotId));
    return () => {
      dispatch(clearSpots());
      dispatch(clearReviews());
    };
  }, [dispatch, spotId]);

  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj).reverse();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
  }, [dispatch, spotId, reviewsObj]);

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

  return (
    <div className="mainContainer spots">
      <h1>{spot.name}</h1>
      <h2>
        {spot.city}, {spot.state} {" - "} {spot.country}
      </h2>
      <div className="imagesContainer">
        <div className="previewImage" id="box-1">
          <img alt="preview" src={previewImage.url} />
        </div>
        {images.map((image) => (
          <div className="supportImages" key={`box-${image.id}`}>
            <img className="supportingImages" alt={image.id} src={image.url} />
          </div>
        ))}
      </div>
      <div id="spotMenu">
        <div id="spotInfo">
          <h2>
            Hosted By: {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p id="spotDescription">{spot.description}</p>
        </div>
        <div id="reserveSection">
          <div id="priceAndRating">
            <p id="spotPrice">
              <span>${Number(spot.price).toFixed(2)}</span> night
            </p>
            <p id="spotRating">
              <i className="fa-solid fa-star" />
              {spot.avgStarRating ? " " + Number(spot.avgStarRating).toFixed(2) : " New"}
              {spot.numReviews ? ` · ${spot.numReviews} reviews` : null}
            </p>
          </div>
          <button className="pinkButton reserve" onClick={() => alert("Feature Coming Soon!")}>
            Reserve
          </button>
        </div>
      </div>
      <hr />
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
            className="greyButton review"
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
                  className="greyButton delete"
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
