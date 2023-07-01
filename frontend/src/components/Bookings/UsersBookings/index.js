import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../../store/bookingsReducer";
import { isPast, isFuture, isSameDay, isAfter } from "date-fns";
import UpcomingBookingItem from "../UpcomingBookingItem";
import PreviousBookingItem from "../PreviousBookingItem";
import "./UsersBookings.css";

const UsersBookings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => Object.values(state.bookings));
  const upcomingBookings = bookings.filter(
    (booking) =>
      isFuture(new Date(booking.startDate)) || isSameDay(new Date(), new Date(booking.startDate))
  );
  const previousBookings = bookings.filter((booking) => isPast(new Date(booking.endDate)));

  const goBack = () => {
    history.push("/")
  }

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
          {upcomingBookings.length ? (
            upcomingBookings.map((booking) => <UpcomingBookingItem booking={booking} />)
          ) : (
            <div>
              <h2>Looks like you dont have any upcoming trips!</h2>
              <div style={{marginTop: "20px"}}>
                <button className="pink-button" onClick={goBack}>Go back to spots</button>
              </div>
            </div>
          )}
        </div>
        <div className="previous-booking-cards">
          <h2 className="previous-trips-header">Previous trips</h2>
          <div className="previous-bookings-grid">
            {previousBookings.length &&
              previousBookings.map((booking) => <PreviousBookingItem booking={booking} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;
