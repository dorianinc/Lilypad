import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import "./Bookings.css";

const Bookings = () => {
  const [startDate, setStartDate] = useState("Add Date");
  const [endDate, setEndDate] = useState("Add Date");

  return (
    <div className="bookings-container">
      <div className="start-date-container">
        <p id="checkin-text">CHECK-IN</p>
        <p id="start-date-text">{startDate}</p>
      </div>
      <div className="end-date-container">
        <p id="checkout-text">CHECKOUT</p>
        <p id="end-date-text">{endDate}</p>
      </div>
      <div className="calendar-container">
        <div className="month-container">
          <div className="booking-summary-review">
            <h2>4 Nights</h2>
            <p>Aug 12, 2023 - Aug 17, 2023</p>
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Bookings;
