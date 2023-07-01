import { useEffect, useRef } from "react";
import { useCalendar } from "../../../context/CalendarContext";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Calendar from "../../Calendar";
import "./BookingForm.css";

const BookingForm = ({ spotId }) => {
  const {
    setOnStartDate,
    startDate,
    endDate,
    showCalendar,
    setShowCalendar,
    setFocus,
  } = useCalendar();
  const history = useHistory();
  const calendarRef = useRef();

  const handleBooking = async (e) => {
    e.preventDefault();
    history.push(`/bookings/spots/${spotId}`);
  };

  ////// calendar logic ///////
  const openCalendar = () => {
    setOnStartDate(true);
    setShowCalendar(true);
    setFocus(1);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
    setFocus("");
  };

  useEffect(() => {
    if (!showCalendar) return;

    document.addEventListener("click", (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        closeCalendar(true);
      }
    });
    return () => document.removeEventListener("click", closeCalendar);
  }, [showCalendar]);

  return (
    <div ref={calendarRef}>
      <div className="bookings-container">
        <div className="start-end-display">
          <div className={`start-date-shell`} onClick={openCalendar}>
            <p id="checkin-text">CHECK-IN</p>
            <p id="start-date-text">
              {startDate ? format(new Date(startDate), "MM/dd/yyyy") : "Add Date"}
            </p>
          </div>
          <div className={`end-date-shell`} onClick={openCalendar}>
            <p id="checkout-text">CHECKOUT</p>
            <p id="end-date-text">
              {endDate ? format(new Date(endDate), "MM/dd/yyyy") : "Add Date"}
            </p>
          </div>
          <div className={`calendar-container ${!showCalendar ? "hidden" : ""}`}>
            <Calendar spotId={spotId} setShowCalendar />
          </div>
        </div>
      </div>
      <div className="booking-button-container">
        {startDate && endDate ? (
          <button className="pink-button reserve" onClick={(e) => handleBooking(e)}>
            Reserve
          </button>
        ) : (
          <button className="pink-button reserve" onClick={openCalendar}>
            Check Availability
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
