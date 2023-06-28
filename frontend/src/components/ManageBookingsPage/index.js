import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/bookingsReducer";
import { isBefore, isAfter } from "date-fns";
import UpcomingBookingItem from "../Bookings/UpcomingBookingItem";
import "./ManageBookingsPage.css";

const ManageBookingsPage = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => Object.values(state.bookings));
  const upcomingBookings = bookings.filter(booking => isBefore(new Date, new Date(booking.startDate)))
  const previousBookings =  bookings.filter(booking => isAfter(new Date, new Date(booking.endDate)))


  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);
  if(!bookings.length) return null
  return (
    <div className="bookings-main-container">
      <div className="bookings-header-container">
        <h1 className="bookings-header">Trips</h1>
        <h2 className="bookings-sub-header">Upcoming reservations</h2>
      </div>
      <div style={{ margin: "10px 0" }}>
        {upcomingBookings.map(booking => (
        <UpcomingBookingItem booking={booking}/>
        ))}
      </div>
    </div>
  );
};

export default ManageBookingsPage;
