import { useState, useEffect, useRef } from "react";
import Calendar from "./Calendar";
import "./Bookings.css";

const Bookings = () => {
  const calendarRef = useRef();
  const [showCalendar, setShowCalendar] = useState(false);
  const [booking, setBooking] = useState([
    {
      startDate: null,
      endDate: new Date(""),
      color: "#5de373",
      key: "selection",
    },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!showCalendar) return;

    const closeCalendar = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("click", closeCalendar);

    return () => document.removeEventListener("click", closeCalendar);
  }, [showCalendar]);

  const clearDates = () => {
    const dates = booking[0];

    dates.startDate = null;
    dates.endDate = new Date("");
    setStartDate("")
    setEndDate("")
    setBooking([dates]);
  };

  return (
    <div className="bookings-container" ref={calendarRef}>
      <div className="start-date-container" onClick={() => setShowCalendar(true)}>
        <p id="checkin-text">CHECK-IN</p>
        <p id="start-date-text">{startDate ? startDate.toLocaleDateString("en-US") : "Add Date"}</p>
      </div>
      <div className="end-date-container" onClick={() => setShowCalendar(true)}>
        <p id="checkout-text">CHECKOUT</p>
        <p id="end-date-text">{endDate ? endDate.toLocaleDateString("en-US") : "Add Date"}</p>
      </div>
      <div className={`calendar-container ${!showCalendar ? "hidden" : ""}`}>
        <div className="month-container">
          <div className="booking-summary-review">
            <h2>4 Nights</h2>
            <p>Aug 12, 2023 - Aug 17, 2023</p>
          </div>
          <Calendar
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setBooking={setBooking}
            booking={booking}
          />
          <div className="buttons-end">
            <button className="clear-button" onClick={clearDates}>
              {" "}
              Clear Dates
            </button>
            <button className="black-button" onClick={() => setShowCalendar(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
