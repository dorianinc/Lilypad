import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import SpotPage from "./components/SpotDetailsPage/SpotDetails";
import ManageSpotsPage from "./components/ManageSpotsPage/ManageSpots";
import NewSpotPage from "./components/Forms/CreateSpotForm/CreateSpot";
import EditSpotPage from "./components/Forms/EditSpotForm/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/spots/new">
            <NewSpotPage />
          </Route>
          <Route path="/spots/current">
            <ManageSpotsPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
