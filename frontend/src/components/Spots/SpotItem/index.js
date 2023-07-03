import { useHistory, useLocation } from "react-router-dom";
import ModalButton from "../../Modals/ModalButton";
import DeleteSpotModal from "../../Modals/DeleteSpotModal/DeleteSpot";
import "./SpotItem.css"

const SpotItem = ({ spot }) => {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const handleUpdate = () => {
    history.push(`/spots/${spot.id}/edit`);
  };

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };
  if (!spot) return null;
  return (
    <div>
      <div
        key={spot.id}
        data-tooltip={spot.name}
        className="card-container homepage"
        onClick={() => handleClick(spot.id)}
      >
        <div className="imageContainer">
          <img className="card-image" alt="airBnB" loading="lazy" src={spot.previewImage} />
        </div>
        <div className="card-info">
          <div className="city-state-info">
            <p>{`${spot.city}, ${spot.state}`}</p>
          </div>
          <div className="rating">
            <i className="fa-solid fa-star" />
            {" · "} {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
          </div>
        </div>
        <div className="card-price">
          <span>${spot.price}</span> night
        </div>
      </div>
        {pathName.startsWith("/spots") ? (
          <div className="buttonsContainer" onClick={(e) => e.stopPropagation()}>
            <button className="grey-button update" onClick={() => handleUpdate()}>
              Update
            </button>
            <ModalButton
              buttonContent={<button className="grey-button delete">Delete</button>}
              modalComponent={<DeleteSpotModal spotId={spot.id} />}
            />
          </div>
        ) : null}
    </div>
  );
};

export default SpotItem;
