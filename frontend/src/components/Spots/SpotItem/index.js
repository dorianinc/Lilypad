import { useHistory, useLocation } from "react-router-dom";
import ModalButton from "../../Modals/ModalButton";
import DeleteSpotModal from "../../Modals/DeleteSpotModal/DeleteSpot";

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
    <>
      <div
        key={spot.id}
        data-tooltip={spot.name}
        className="cardContainer homePage"
        onClick={() => handleClick(spot.id)}
      >
        <div className="imageContainer">
          <img className="cardImage" alt="airBnB" loading="lazy" src={spot.previewImage} />
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
        {pathName.startsWith("/spots") ? (
          <div className="buttonsContainer" onClick={(e) => e.stopPropagation()}>
            <button className="grey-button update" onClick={() => handleUpdate()}>
              Update
            </button>
            <ModalButton
              className="grey-button delete"
              buttonContent={<p>Delete</p>}
              modalComponent={<DeleteSpotModal spotId={spot.id} />}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SpotItem;
