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
import ManageBookingsPage from "./components/ManageBookingsPage";
import ConfirmBooking from "./components/ConfirmBooking";

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
          <Route path="/spots/new">
            <NewSpotPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route path="/spots">
            <ManageSpotsPage />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotPage />
          </Route>
          <Route path="/bookings/spots/:spotId">
            <ConfirmBooking />
          </Route>
          <Route path="/bookings">
            <ManageBookingsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
