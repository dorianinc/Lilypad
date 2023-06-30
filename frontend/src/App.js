import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import SpotPage from "./components/Spots/SpotDetails/SpotDetails";
import ManageSpotsPage from "./components/Spots/UsersSpots/UsersSpots";
import NewSpotPage from "./components/Spots/CreateSpotForm/CreateSpot";
import EditSpotPage from "./components/Spots/EditSpotForm/EditSpot";
import BookingsPage from "./components/Bookings/UsersBookings";
import ConfirmBooking from "./components/Bookings/BookingConfirmation";
import BookingDetails from "./components/Bookings/BookingDetails";

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
          <Route path="/spots/:spotId/edit">
            <EditSpotPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route exact path="/spots">
            <ManageSpotsPage />
          </Route>
          <Route path="/bookings/spots/:spotId">
            <ConfirmBooking />
          </Route>
          <Route path="/bookings/:bookingId">
            <BookingDetails />
          </Route>
          <Route path="/bookings">
            <BookingsPage />
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
