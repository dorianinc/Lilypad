import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../../store/bookingsReducer";
import { isPast, isFuture, isSameDay, addDays, isAfter } from "date-fns";
import UpcomingBookingItem from "../UpcomingBookingItem";
import PreviousBookingItem from "../PreviousBookingItem";
import "./UsersBookings.css";

const UsersBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => Object.values(state.bookings));
  const upcomingBookings = bookings.filter(
    (booking) =>
      isFuture(addDays(new Date(booking.startDate), 1)) ||
      isSameDay(new Date(), addDays(new Date(booking.startDate), 1))
  );
  const previousBookings = bookings.filter((booking) =>
    isPast(addDays(new Date(booking.endDate), 1))
  );

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);
  if (!bookings.length) return null;
  return (
    <div className="bookings-main-container">
      <div className="bookings-header-container">
        <h1 className="bookings-header">Trips</h1>
        <h2 className="bookings-sub-header">Upcoming trips</h2>
      </div>
      <div className="booking-cards-content">
        <div className="upcoming-booking-cards">
          {upcomingBookings.map((booking) => (
            <UpcomingBookingItem booking={booking} />
          ))}
        </div>
        <div className="previous-booking-cards">
          <h2 className="previous-trips-header">Previous trips</h2>
          <div className="previous-bookings-grid">
            {previousBookings.map((booking) => (
              <PreviousBookingItem booking={booking}/>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;
