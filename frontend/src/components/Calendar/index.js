import { useState, useEffect, useRef } from "react";
import { useModal } from "../../context/Modal";
import { useCalendar } from "../../context/CalendarContext";
import { useLocation } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import Dates from "./Dates";
import "./Calendar.css";

const Calendar = ({ bookingIdKey, minNights }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const calendarRef = useRef();
  const [formattedDate, setFormattedDate] = useState("");
  const [numNights, setNumNights] = useState();
  const { closeModal } = useModal();
  const { setOnStartDate } = useCalendar();
  const { booking, setBooking } = useCalendar();
  const { globalStartDate, setGlobalStartDate } = useCalendar();
  const { globalEndDate, setGlobalEndDate } = useCalendar();
  const { showCalendar, setShowCalendar } = useCalendar();
  const { focus, setFocus } = useCalendar();
  const { calendarErrors, setCalendarErrors } = useCalendar();


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
    if (globalStartDate && !globalEndDate) {
      setFocus(2);
      setNumNights(0);
      setFormattedDate("");
    }
    if (globalStartDate && globalEndDate) {
      if (new Date(globalStartDate).getTime() < new Date(globalEndDate).getTime()) {
        setFormattedDate(
          `${format(new Date(globalStartDate), "MMM dd")} - ${format(
            new Date(globalEndDate),
            "MMM dd"
          )}`
        );
        setNumNights(differenceInCalendarDays(globalEndDate, globalStartDate));
        if (pathName.startsWith("/spots") && !Object.values(calendarErrors).length) closeCalendar();
      }
    }
  }, [globalStartDate, globalEndDate]);

  const clearDates = (submitted) => {
    const dates = booking[0];

    if (submitted) setFocus("");
    else setFocus(1);
    dates.globalStartDate = null;
    dates.globalEndDate = new Date("");
    localStorage.setItem("storedStartDate", "");
    setGlobalStartDate("");
    localStorage.setItem("storedEndDate", "");
    setGlobalEndDate("");
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
                {globalStartDate ? format(new Date(globalStartDate), "MM/dd/yyyy") : "Add Date"}
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
                {globalEndDate ? format(new Date(globalEndDate), "MM/dd/yyyy") : "Add Date"}
              </p>
            </div>
          </div>
        </div>
        <Dates minNights={minNights} bookingIdKey={bookingIdKey} />
        <p className="errors" style={{ textAlign: "center" }}>
          {calendarErrors.error}
        </p>
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
