import { useHistory } from "react-router-dom";
import { format, formatDistance, addDays } from "date-fns";
import "./UpcomingBookingItem.css";

const UpcomingBookingItem = ({ booking }) => {
  const history = useHistory();
  const startDate = addDays(new Date(booking.startDate), 1);
  const timeRemaining = formatDistance(Date.now(), startDate);
  const formattedStartDate = format(addDays(new Date(booking.startDate), 1), "MMM do");
  const formattedEndDate = format(addDays(new Date(booking.endDate), 1), "MMM do");

  const handleClick = () => {
    history.push(`/bookings/${booking.id}`);
  };
  // const formattedRange = () => {
  //   const rangeSet = new Set();
  //   const formattedStartDate = format(new Date(booking.startDate), "MMM dd yyyy");
  //   const formattedEndDate = format(new Date(booking.endDate), "MMM dd yyyy");
  // };

  if (!booking.id || !booking.spot) return null;
  return (
    <div className="upcoming-booking-item" onClick={handleClick}>
      <div className="upcoming-booking-item-info">
        <h2 className="booking-city-header">{booking.spot.city}</h2>
        <p style={{ fontWeight: "300" }}>Hosted by {booking.spot.owner.firstName}</p>
        <hr className="booking-section-divider" />
        <div className="upcoming-booking-item-date-address">
          <div className="booking-dates">
            <p>{formattedStartDate}</p>
            <p>-</p>
            <p>{formattedEndDate}</p>
          </div>
          <hr className="booking-section-divider" style={{ margin: "0 15px" }} />
          <div className="booking-address-info">
            <p>{booking.spot.address}</p>
            <p>
              {booking.spot.city}, {booking.spot.state}
            </p>
            <p>{booking.spot.state}</p>
          </div>
        </div>
      </div>
      <div className="upcoming-booking-item-image-container">
        <img
          className="upcoming-booking-item-image"
          alt="booking-preview"
          loading="lazy"
          src={booking.spot.previewImage}
        />
        <div className="time-remaining">
          <p style={{ fontSize: ".8rem", fontWeight: "600" }}>In {timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingBookingItem;
