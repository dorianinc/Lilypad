import { useState, useEffect, useRef } from "react";
import { useCalendar } from "../../../context/CalendarContext";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Calendar from "../../Calendar";
import "./BookingForm.css";

const BookingForm = ({ spot, action }) => {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numPets, setNumPets] = useState(0);
  const [currentOccupancy, setcurrentOccupancy] = useState(1);

  const { setOnStartDate, startDate, endDate, showCalendar, setShowCalendar, setFocus } =
    useCalendar();
  const history = useHistory();
  const calendarRef = useRef();

  const handleBooking = (e) => {
    e.preventDefault();
    history.push(`/bookings/spots/${spot.id}`);
  };

  const handleOccupancy = (key, action) => {
    if (action === "add" && currentOccupancy < spot.maxGuests) {
      setcurrentOccupancy((prev) => prev + 1);
      if (key === "adult") setNumAdults((prev) => prev + 1);
      if (key === "child") setNumChildren((prev) => prev + 1);
      if (key === "pet") setNumPets((prev) => prev + 1);
    } else if (action === "subtract") {
      if (key === "adult") {
        if (numAdults > 1) {
          setNumAdults((prev) => prev - 1);
          setcurrentOccupancy((prev) => prev - 1);
        }
      }
      if (key === "child") {
        if (numChildren > 0) {
          setNumChildren((prev) => prev - 1);
          setcurrentOccupancy((prev) => prev - 1);
        }
      }
      if (key === "pet") {
        if (numPets > 0) {
          setNumPets((prev) => prev - 1);
          setcurrentOccupancy((prev) => prev - 1);
        }
      }
    }
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
    <>
      {action === "create" ? (
        <div ref={calendarRef}>
          <div className="bookings-container">
            <div className="bookings-selection-container">
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
                  <Calendar spotId={spot.id} minNights={spot.minNights} setShowCalendar />
                </div>
              </div>
              <div className="num-guests-selector">
                <div style={{ padding: "5px 10px" }}>
                  <p id="checkout-text">Guests</p>
                  <p id="end-date-text">1 guest</p>
                </div>
                <div className="num-guests-content">
                  <div className="guest-catagory">
                    <div className="guest-key">
                      <p>Adults</p>
                    </div>
                    <div className="guest-values">
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("adult", "subtract")}
                      >
                        <i class="fa-solid fa-minus" />
                      </button>
                      <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
                        {numAdults}
                      </p>
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("adult", "add")}
                      >
                        <i class="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div className="guest-catagory">
                    <div className="guest-key">
                      <p>Children</p>
                    </div>
                    <div className="guest-values">
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("child", "subtract")}
                      >
                        <i class="fa-solid fa-minus" />
                      </button>
                      <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
                        {numChildren}
                      </p>
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("child", "add")}
                      >
                        <i class="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div className="guest-catagory">
                    <div className="guest-key">
                      <p>Pets</p>
                    </div>
                    <div className="guest-values">
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("pet", "subtract")}
                      >
                        <i class="fa-solid fa-minus" />
                      </button>
                      <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
                        {numPets}
                      </p>
                      <button
                        className="plus-minus-button"
                        onClick={() => handleOccupancy("pet", "add")}
                      >
                        <i class="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: ".9rem", fontWeight: "500", textAlign: "center" }}>
                    Maximum Occupancy: {spot.maxGuests}
                  </p>
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
      ) : (
        action === "edit"(<div>editing here</div>)
      )}
    </>
  );
};

export default BookingForm;
