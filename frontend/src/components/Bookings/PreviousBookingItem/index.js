import { format, formatDistance, addDays } from "date-fns";
import "./PreviousBookingItem.css";

const PreviousBookingItem = ({ booking }) => {
  const formattedStartDate = format(addDays(new Date(booking.startDate), 1), "MMM do");
  const formattedEndDate = format(addDays(new Date(booking.endDate), 1), "MMM do");
  if (!booking.id || !booking.Spot) return null;
  return (
    <div className="prev-booking-item">
      <div className="prev-booking-image-container">
        <img className="prev-booking-image" alt="booking-preview" src={booking.Spot.previewImage} />
      </div>
      <div className="prev-booking-info">
        <p style={{ fontSize: ".9rem", fontWeight: "500" }}>{booking.Spot.city}</p>
        <p style={{ color: "#888888", fontSize: ".8rem", fontWeight: "400" }}>
          Hosted by {booking.Spot.owner.firstName}
        </p>
        <p style={{ color: "#888888", fontSize: ".9rem", fontWeight: "400" }}>
          {formattedStartDate} - {formattedEndDate}
        </p>
      </div>
    </div>
  );
};

export default PreviousBookingItem;
