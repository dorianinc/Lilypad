import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import SpotPage from "./components/Spots/SpotDetails/SpotDetails";
import ManageSpotsPage from "./components/Spots/UsersSpots/UsersSpots";
import BookingsPage from "./components/Bookings/UsersBookings";
import ConfirmBooking from "./components/Bookings/BookingConfirmation";
import BookingDetails from "./components/Bookings/BookingDetails";
import EditBookingForm from "./components/Bookings/EditBookingForm";
import SpotForm from "./components/Spots/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className="content-container">
          <Switch>
            <Route path="/spots/new">
              <SpotForm />
            </Route>
            <Route path="/spots/:spotId/edit">
              <SpotForm />
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
            <Route path="/bookings/:bookingId/edit">
              <EditBookingForm />
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
        </div>
      )}
    </div>
  );
}

export default App;
