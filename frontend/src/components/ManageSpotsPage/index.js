import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserSpotsThunk, clearSpotsAction  } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";
import "./ManageSpotsPage.css";

function ManageSpotsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  let closeMenu;
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(loadUserSpotsThunk());

    return () => {
      dispatch(clearSpotsAction());
    };
  }, []);

  const handleCreate = () => {
    history.push("/spots/new");
  };

  const handleUpdate = (spotId) => {
    history.push(`/spots/${spotId}/edit`);
  };

  const handleClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <>
      <h1>Manage Your Spots</h1>
      {spots.length ? (
        <div className="mainContainer userSpots">
          {spots.map((spot) => (
            <div key={spot.id} className="spotsContainer">
              <div onClick={() => handleClick(spot.id)}>
                <div className="imageContainer">
                  <img id="cardImage" alt="airBnB" src={spot.previewImage} />
                </div>
                <div className="cardInfo">
                  <div className="city-stateCard">{`${spot.city}, ${spot.state}`}</div>
                  <div className="cardRating">
                    <i class="fa-solid fa-star" />{" "}
                    {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
                  </div>
                </div>
                <div className="cardPrice">
                  <span>{`$${150}`}</span> night
                </div>
              </div>
              <div id="buttonsContainer">
                <button className="manageSpotButtons" onClick={() => handleUpdate(spot.id)}>
                  Update
                </button>
                <OpenModalButton
                  className="modalButtons delete"
                  buttonText="Delete"
                  onButtonClick={closeMenu}
                  modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button className="manageSpotButtons" onClick={handleCreate}>
            Create a Spot
          </button>
        </div>
      )}
    </>
  );
}

export default ManageSpotsPage;
