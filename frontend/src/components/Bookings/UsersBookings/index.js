import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../../store/bookingsReducer";
import { isPast, isFuture } from "date-fns";
import UpcomingBookingItem from "../UpcomingBookingItem";
import "./UsersBookings.css";

const UsersBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => Object.values(state.bookings));
  const upcomingBookings = bookings.filter((booking) => isFuture(new Date(booking.startDate)));
  const previousBookings = bookings.filter((booking) => isPast(new Date(booking.endDate)));

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);
  if (!bookings.length) return null;
  return (
    <div className="bookings-main-container">
      <div className="bookings-header-container">
        <h1 className="bookings-header">Trips</h1>
        <h2 className="bookings-sub-header">Upcoming reservations</h2>
      </div>
      <div style={{ margin: "10px 0" }}>
        {upcomingBookings.map((booking) => (
          <UpcomingBookingItem booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default UsersBookings;
