import { format, formatDistance, addDays } from "date-fns";
import "./PreviousBookingItem.css";

const PreviousBookingItem = ({ booking }) => {
  const formattedStartDate = format(addDays(new Date(booking.startDate), 1), "MMM do")
  const formattedEndDate = format(addDays(new Date(booking.endDate), 1), "MMM do")

  if (!booking.id || !booking.Spot) return null;
  return (
    <div className="prev-booking-item">
    </div>
  );
};

export default PreviousBookingItem;
