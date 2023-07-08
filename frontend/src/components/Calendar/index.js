import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import { useCalendar } from "../../context/CalendarContext";
import { useLocation } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import Dates from "./Dates";
import "./Calendar.css";

const Calendar = ({ minNights }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const calendarRef = useRef();
  const [formattedDate, setFormattedDate] = useState("");
  const [numNights, setNumNights] = useState();

  const {
    setOnStartDate,
    booking,
    setBooking,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showCalendar,
    setShowCalendar,
    focus,
    setFocus,
    calendarErrors,
    setCalendarErrors,
  } = useCalendar();


  const { closeModal } = useModal();


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

  useEffect(() => {
    if (startDate && !endDate) {
      setFocus(2);
      setNumNights(0);
      setFormattedDate("");
    }
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, "MMM dd");
      const formattedEndDate = format(endDate, "MMM dd");
      if (formattedStartDate.getTime() < formattedEndDate.getTime()) {
        setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`);
        setNumNights(differenceInCalendarDays(endDate, startDate));
        if (pathName.startsWith("/spots") && !Object.values(calendarErrors).length) closeCalendar();
      }
    }
  }, [startDate, endDate]);

  const clearDates = (submitted) => {
    const dates = booking[0];

    if (submitted) setFocus("");
    else setFocus(1);
    dates.startDate = null;
    dates.endDate = new Date("");
    localStorage.setItem("storedStartDate", "");
    setStartDate("");
    localStorage.setItem("storedEndDate", "");
    setEndDate("");
    setNumNights(0);
    setFormattedDate("");
    setBooking([dates]);
    setOnStartDate(true);
    setCalendarErrors({});
  };

  return (
    <div className="calendar-content">
      <div className="month-container">
        <div className="booking-summary-review">
          <div>
            <h2>
              {numNights ? `${numNights} ${numNights === 1 ? "night" : "nights"}` : "Select dates"}
            </h2>
            <p>{formattedDate ? `${formattedDate}` : "Add your travel dates for exact pricing"}</p>
          </div>
          <div className="start-end-container">
            <div
              className={`start-date-container ${
                focus === 1 ? "focused" : focus === 2 ? "unfocused" : null
              }`}
              onClick={openCalendar}
            >
              <p id="checkin-text">CHECK-IN</p>
              <p id="start-date-text">
                {startDate ? format(startDate, "MM/dd/yyyy") : "Add Date"}
              </p>
            </div>
            <div
              className={`end-date-container ${
                focus === 2 ? "focused" : focus === 1 ? "unfocused" : null
              }`}
              onClick={openCalendar}
            >
              <p id="checkout-text">CHECKOUT</p>
              <p id="end-date-text">
                {endDate ? format(endDate, "MM/dd/yyyy") : "Add Date"}
              </p>
            </div>
          </div>
        </div>
        <Dates minNights={minNights} />
        <p className="errors">{calendarErrors.numNights}</p>
        <div className="buttons-end">
          <button className="clear-button" onClick={() => clearDates(false)}>
            Clear Dates
          </button>
          <button
            className="black-button"
            onClick={pathName.startsWith("/spots") ? closeCalendar : closeModal}
          >
            {pathName.startsWith("/spots") ? "Close" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
