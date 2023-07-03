import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserSpotsThunk } from "../../../store/spotsReducer";
import SpotItem from "../SpotItem";

import "./UsersSpots.css";

function UsersSpots() {
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getUserSpotsThunk());
  }, [dispatch]);

  const handleCreate = () => {
    history.push("/spots/new");
  };


  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <h1 className="content-header">Manage Your Spots</h1>
      {spots.length ? (
        <div className="spots-container manageSpots">
          {spots.map((spot) => (
            <SpotItem spot={spot} />
          ))}
        </div>
      ) : (
        <div>
          <button className="grey-button create" onClick={handleCreate}>
            Create a Spot
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersSpots;
