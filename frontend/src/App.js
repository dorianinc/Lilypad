import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotPage from "./components/SpotPage";
import ManageSpotsPage from "./components/ManageSpotsPage";
import NewSpotPage from "./components/NewSpotPage/NewSpotPage";
import EditSpotPage from "./components/EditSpotPage/EditSpotPage";

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
            <LandingPage />
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
