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
      {spots.length ? (
        <>
          <h1 className="content-header">Manage Your Spots</h1>
          <div className="users-spots-container">
            {spots.map((spot) => (
              <SpotItem spot={spot} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "grid", justifyContent: "center", marginTop: "25px" }}>
          <h3>You have no spots! Create one now!</h3>
          <button className="grey-button create" onClick={handleCreate}>
            Create a Spot
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersSpots;
