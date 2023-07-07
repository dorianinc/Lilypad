import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { format, addDays } from "date-fns";
import { useCalendar } from "../../../context/CalendarContext";
import { useCounter } from "../../../context/CounterContext";
import {
  getSingleBookingsThunk,
  getSpotBookingsThunk,
  updateBookingsThunk,
} from "../../../store/bookingsReducer";
import ModalButton from "../../Modals/ModalButton";
import Calendar from "../../Calendar";
import GuestCounter from "../GuestCounter";
import "./EditBookingForm.css";

const EditBookingForm = () => {
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    setOnStartDate,
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    setShowCalendar,
    setFocus,
    setBookedDates,
  } = useCalendar();

  const {
    numAdults,
    setNumAdults,
    numChildren,
    setNumChildren,
    numInfants,
    setNumInfants,
    setOccupancy,
    occupancy,
  } = useCounter();
  const [booking, setBooking] = useState("");
  const numNights = Math.round(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
  );

  const openCalendar = () => {
    setOnStartDate(true);
    setShowCalendar(true);
    setFocus(1);
  };

  useEffect(() => {
    dispatch(getSingleBookingsThunk(bookingId)).then((booking) => {
      setBooking(booking);
      setStartDate(addDays(new Date(booking.startDate), 1));
      setEndDate(addDays(new Date(booking.endDate), 1));
      setNumAdults(booking.numAdults);
      setNumChildren(booking.numChildren);
      setNumInfants(booking.numInfants);
      setOccupancy(booking.numAdults + booking.numChildren + booking.numInfants);
      dispatch(getSpotBookingsThunk(booking.spotId)).then((bookedDates) => {
        setBookedDates(bookedDates);
      });
    });
  }, [dispatch, bookingId]);

  const updateBooking = async (e) => {
    e.preventDefault();

    const formattedStartDate = format(new Date(startDate), "Y-MM-dd");
    const formattedEndDate = format(new Date(endDate), "Y-MM-dd");
    const updatedBooking = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      numNights,
      numAdults,
      numChildren,
      numInfants,
    };
    await dispatch(updateBookingsThunk(bookingId, updatedBooking));
    history.push(`/bookings/${bookingId}`);
  };

  if (!booking || !booking.spot) return null;
  return (
    <div className="edit-booking-container">
      <h1>What do you want to change?</h1>
      <h3>We understand things happen and we're here for you!</h3>
      <div className="image-container edit-booking">
        <img src={booking.spot.previewImage} />
      </div>
      <h2 style={{ marginBottom: "2px" }}>Reservation details</h2>
      <h4>Dates</h4>
      <ModalButton
        modalComponent={<Calendar minNights={booking.spot.minNights} />}
        buttonContent={
          <div
            className="start-end-display"
            style={{ border: "2px solid #c0c0c0", borderRadius: "5px", marginBottom: "15px" }}
          >
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
          </div>
        }
      />
      <h4>Guests</h4>
      <ModalButton
        modalComponent={
          <GuestCounter
            maxGuests={booking.spot.maxGuests}
            guestList={{
              numAdults: booking.numAdults,
              numChildren: booking.numChildren,
              numInfants: booking.numInfants,
            }}
          />
        }
        buttonContent={
          <div
            className="num-guests-selector"
            style={{ border: "2px solid #c0c0c0", borderRadius: "5px" }}
          >
            <div style={{ padding: "5px 10px" }}>
              <p id="checkout-text">Guests</p>
              <p id="end-date-text">
                {occupancy} guest{occupancy > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        }
      />
      <div className="buttons-end" style={{ marginTop: "15px" }}>
        <button className="clear-button">Cancel</button>
        {/* <button className={`black-button ${changed && "disabled"}`} disabled={changed}> */}
        <button className="black-button" onClick={(e) => updateBooking(e)}>Confirm Changes</button>
      </div>
    </div>
  );
};

export default EditBookingForm;
