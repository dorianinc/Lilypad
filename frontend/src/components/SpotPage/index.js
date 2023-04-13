import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { previewSpotThunk, clearSpotsAction } from "../../store/spots";
import { loadReviewsThunk, clearReviewsAction } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import "./SpotPage.css";

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [images, setImages] = useState([]);
  let closeMenu;

  useEffect(() => {
    dispatch(previewSpotThunk(spotId)).then((spot) => {
      const prevImage = spot.SpotImages.find(
        (image) => image.preview === true || image.preview === 1
      );
      const imageArray = spot.SpotImages.filter((image) => image.id !== prevImage.id);
      setPreviewImage(prevImage);
      setImages(imageArray);
    });
    dispatch(loadReviewsThunk(spotId));
    return () => {
      dispatch(clearSpotsAction());
      dispatch(clearReviewsAction());
    };
  }, [dispatch, spotId]);

  const userId = useSelector((state) => state.session.user?.id);
  const spot = useSelector((state) => state.spots[spotId]);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj).reverse();
  const hasReview = reviews.find((review) => review.userId === 1);
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
      <div id="imagesContainer">
        <div className="boxes" id="box-1">
          <img id="previewImage" alt="preview" src={previewImage.url} />
        </div>
        {images.map((image) => (
          <div className="boxes" key={`box-${image.id}`}>
            <img alt={image.id} src={image.url} />
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
        {userId && userId !== spot.Owner.id && !hasReview ? (
          <OpenModalButton
            className="greyButton review"
            buttonText="Post your Review"
            onButtonClick={closeMenu}
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
            </div>
          ))
        ) : userId !== spot.Owner.id ? (
          <div>Be the First to Review!</div>
        ) : null}
      </div>
    </div>
  );
}

export default SpotPage;
