import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotsThunk, clearSpots } from "../../store/spotsReducer";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getSpotsThunk());
    return () => {
      dispatch(clearSpots());
    };
  }, [dispatch]);

  const handleClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  if (!spots) return null;
  return (
    <div className="mainContainer homepage">
      {spots.map((spot) => (
        <div
          key={spot.id}
          data-tooltip={spot.name}
          className="cardContainer"
          onClick={() => handleClick(spot.id)}
        >
          <div className="imageContainer">
            <img id="cardImage" alt="airBnB" src={spot.previewImage} />
          </div>
          <div className="cardInfo">
            <div className="city-stateCard">{`${spot.city}, ${spot.state}`}</div>
            <div className="cardRating">
              <i className="fa-solid fa-star" />
              {" · "} {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
            </div>
          </div>
          <div className="cardPrice">
            <span>{`$${150}`}</span> night
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;