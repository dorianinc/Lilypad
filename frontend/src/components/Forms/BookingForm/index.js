import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCalendar } from "../../../context/CalendarContext";
import { useHistory } from "react-router-dom";
import { getSpotBookingsThunk, createBookingsThunk } from "../../../store/bookingsReducer";
import { format } from "date-fns";
import Calendar from "../../Calendar";
import "./BookingForm.css";

const BookingForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const calendarRef = useRef();
  const [focus, setFocus] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [numNights, setNumNights] = useState();
  const bookings = useSelector((state) => Object.values(state.bookings));

  const { setOnStartDate, booking, setBooking, startDate, setStartDate, endDate, setEndDate } =
    useCalendar();

  ////// bookings logic ///////
  useEffect(() => {
    dispatch(getSpotBookingsThunk(spotId));
  }, [dispatch, spotId]);

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

  useEffect(() => {
    if (startDate && !endDate) {
      setFocus(2);
      setNumNights(0);
      setFormattedDate("");
    }
    if (startDate && endDate) {
      const formattedStartDate = format(new Date(startDate), "MMM dd");
      const formattedEndDate = format(new Date(endDate), "MMM dd");
      if (new Date(formattedStartDate).getTime() < new Date(formattedEndDate).getTime()) {
        setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`);
        setNumNights(Math.round((new Date(endDate).getTime() -  new Date(startDate).getTime()) / (1000 * 3600 * 24)));
        closeCalendar();
      }
    }
  }, [startDate, endDate]);

  const clearDates = (submitted) => {
    const dates = booking[0];

    if (submitted) setFocus("");
    else setFocus(1);
    dates.startDate = null;
    dates.endDate = new Date("");
    localStorage.setItem("localStartDate", "");
    setStartDate("");
    localStorage.setItem("localEndDate", "");
    setEndDate("");
    setNumNights(0);
    setFormattedDate("");
    setBooking([dates]);
    setOnStartDate(true);
  };

  return (
    <div ref={calendarRef}>
      <div className="bookings-container" ref={calendarRef}>
        <div
          className={`start-date-container ${
            focus === 1 ? "focused" : focus === 2 ? "unfocused" : null
          }`}
          onClick={openCalendar}
        >
          <p id="checkin-text">CHECK-IN</p>
          <p id="start-date-text">
            {startDate ? format(new Date(startDate), "MM/dd/yyyy") : "Add Date"}
          </p>
        </div>
        <div
          className={`end-date-container ${
            focus === 2 ? "focused" : focus === 1 ? "unfocused" : null
          }`}
          onClick={openCalendar}
        >
          <p id="checkout-text">CHECKOUT</p>
          <p id="end-date-text">{endDate ? format(new Date(endDate), "MM/dd/yyyy") : "Add Date"}</p>
        </div>
        <div className={`calendar-container ${!showCalendar ? "hidden" : ""}`}>
          <div className="month-container">
            <div className="booking-summary-review">
              <h2>
                {numNights
                  ? `${numNights} ${numNights === 1 ? "night" : "nights"}`
                  : "Select dates"}
              </h2>
              <p>
                {formattedDate ? `${formattedDate}` : "Add your travel dates for exact pricing"}
              </p>
            </div>
            <Calendar bookings={bookings} />
            <div className="buttons-end">
              <button className="clear-button" onClick={() => clearDates(false)}>
                Clear Dates
              </button>
              <button className="black-button" onClick={closeCalendar}>
                Close
              </button>
            </div>
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
