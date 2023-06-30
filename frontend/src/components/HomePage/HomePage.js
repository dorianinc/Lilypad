import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotsThunk, clearSpots } from "../../store/spotsReducer";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => Object.values(state.spots));
  console.log("spots 👉", spots)

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  const handleClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  if (!spots.length) return null;
  return (
    <div className="hailMary">
      <div className="mainContainer homePage">
        {spots.map((spot) => (
          <div
            key={spot.id}
            data-tooltip={spot.name}
            className="cardContainer homePage"
            onClick={() => handleClick(spot.id)}
          >
            <div className="imageContainer">
              <img className="cardImage" alt="airBnB" src={spot.previewImage} />
            </div>
            <div className="cardInfo">
              <div className="cityState">
                <p>{`${spot.city}, ${spot.state}`}</p>
              </div>
              <div className="rating">
                <i className="fa-solid fa-star" />
                {" · "} {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
              </div>
            </div>
            <div className="cardPrice">
              <span>${spot.price}</span> night
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
