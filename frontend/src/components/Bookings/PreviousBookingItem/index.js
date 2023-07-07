import { useHistory } from "react-router-dom";
import { format, formatDistance, addDays } from "date-fns";
import "./PreviousBookingItem.css";

const PreviousBookingItem = ({ booking }) => {
  const history = useHistory();
  const formattedStartDate = format(addDays(new Date(booking.startDate), 1), "MMM do");
  const formattedEndDate = format(addDays(new Date(booking.endDate), 1), "MMM do");

  const handleClick = () => {
    history.push(`/bookings/${booking.id}`);
  };

  if (!booking.id || !booking.spot) return null;
  return (
    <div className="prev-booking-item" onClick={handleClick}>
      <div className="prev-booking-image-container">
        <img className="prev-booking-image" alt="booking-preview" loading="lazy" src={booking.spot.previewImage} />
      </div>
      <div className="prev-booking-info">
        <p style={{ fontSize: ".9rem", fontWeight: "500" }}>{booking.spot.city}</p>
        <p style={{ color: "#888888", fontSize: ".8rem", fontWeight: "400" }}>
          Hosted by {booking.spot.owner.firstName}
        </p>
        <p style={{ color: "#888888", fontSize: ".9rem", fontWeight: "400" }}>
          {formattedStartDate} - {formattedEndDate}
        </p>
      </div>
    </div>
  );
};

export default PreviousBookingItem;
