import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { format, formatDistance } from "date-fns";
import { getSingleBookingsThunk, clearBookings } from "../../../store/bookingsReducer";
import Map from "../../Map";
import "./BookingDetails.css";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getSingleBookingsThunk(bookingId));
    return () => {
      dispatch(clearBookings());
    };
  }, [dispatch, bookingId]);

  const goBack = () => {
    history.push("/bookings");
  };

  if (!booking.id || !booking.Spot) return null;
  const formattedStartDate = format(new Date(booking.startDate), "EE, MMM do");
  const formattedEndDate = format(new Date(booking.endDate), "EE, MMM do");
  return (
    <div className="booking-details-section">
      <div className="booking-details-content">
        <div className="booking-details-image">
          <img src={booking.Spot.SpotImages[0].url} />
          <div className="booking-image-overlay">
            <button className="booking-back-button" onClick={goBack}>
              <i class="fa-solid fa-arrow-left fa-2xl" />
            </button>
            <h2 style={{ fontSize: "1.7rem", color: "#fff", fontWeight: "500" }}>
              You're all set for {booking.Spot.city}
            </h2>
          </div>
        </div>
        <div className="booking-details-info">
          <div className="booking-details-dates">
            <div className="booking-checkin-checkout">
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>Check-in</p>
              <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                {formattedStartDate}
              </p>
            </div>
            <hr style={{ border: "1px solid #d2d2d2", margin: "0 10px" }} />
            <div className="booking-checkin-checkout">
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>Checkout</p>
              <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                {formattedEndDate}
              </p>
            </div>
          </div>
          <hr style={{ border: "1px solid #d2d2d2", margin: "15px 10px" }} />
          <div className="bookings-details-menu">
            <div className="booking-details-menu-section">
              <i class="fa-solid fa-location-dot fa-2xl booking-icon" />
              <div className="booking-details-meu-content">
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Getting there</p>
                <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                  Address: {booking.Spot.address}
                </p>
              </div>
            </div>
            <hr style={{ border: "1px solid #d2d2d2", margin: "15px 10px" }} />
            <div className="booking-details-menu-section">
              <i class="fa-solid fa-pen-to-square fa-2xl booking-icon" />
              <div className="booking-details-meu-content">
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Change Booking</p>
                <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                Customize Your Lilypad Bookings for the Perfect Stay
                </p>
              </div>
            </div>
            <hr style={{ border: "1px solid #d2d2d2", margin: "15px 10px" }} />
            <div className="booking-details-menu-section">
              <i class="fa-regular fa-calendar-xmark fa-2xl booking-icon" />
              <div className="booking-details-meu-content">
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Cancel Booking</p>
                <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                  We get it, you hate fun.
                </p>
              </div>
            </div>
            <hr style={{ border: "1px solid #d2d2d2", margin: "15px 10px" }} />
          </div>
        </div>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default BookingDetails;
