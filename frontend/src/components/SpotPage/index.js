import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { previewSpotThunk, clearSpotsAction } from "../../store/spots";
import "./SpotPage.css";

function SpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(previewSpotThunk(spotId));
    
    return () => {
      dispatch(clearSpotsAction());
    };
  }, []);

  const spot = useSelector((state) => state.spots)[spotId];
  if (!spot || !spot.Owner) return null;
  
  const previewImage = spot.SpotImages.find((image) => image.preview === 1);
  const images = spot.SpotImages.filter((image) => image.id !== previewImage.id);

  return (
    <div class="mainContainer spots">
      <h1>{spot.name}</h1>
      <h2>
        {spot.city}, {spot.state} {" - "} {spot.country}
      </h2>
      <div id="imagesContainer">
        <div class="boxes" id="box-1">
          <img id="previewImage" alt="preview" src={previewImage.url} />
        </div>
        {images.map((image) => (
          <div class="boxes" id={`box-${image.id}`}>
            <img src={image.url} />
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
              <span>${spot.price.toFixed(2)}</span> night
            </p>
            <p id="spotRating">
              <i class="fa-solid fa-star" />
              {spot.avgStarRating ? spot.avgStarRating : "New!"}
              {` ${spot.numReviews} reviews`}
            </p>
          </div>
          <button id="reserveButton" onClick={() => alert("Feature Coming Soon!")}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpotPage;
