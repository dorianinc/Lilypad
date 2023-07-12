import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
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
    setGlobalStartDate,
    globalStartDate,
    setGlobalEndDate,
    globalEndDate,
    setFocus,
    setBookedDates,
    booking,
    setBooking,
  } = useCalendar();

  const { numAdults, setNumAdults } = useCounter();
  const { numChildren, setNumChildren } = useCounter();
  const { numInfants, setNumInfants } = useCounter();
  const { occupancy, setOccupancy } = useCounter();
  const [currentBooking, setCurrentBooking] = useState("");
  const numNights = differenceInCalendarDays(new Date(globalEndDate), new Date(globalStartDate));

  const openCalendar = () => {
    setOnStartDate(true);
    setFocus(1);
  };

  useEffect(() => {
    dispatch(getSingleBookingsThunk(bookingId)).then((data) => {
      setCurrentBooking(data);
      setGlobalStartDate(new Date(data.startDate));
      setGlobalEndDate(new Date(data.endDate));
      setBooking([
        {
          ...booking[0],
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      ]);
      setNumAdults(data.numAdults);
      setNumChildren(data.numChildren);
      setNumInfants(data.numInfants);
      setOccupancy(data.numAdults + data.numChildren + data.numInfants);
      dispatch(getSpotBookingsThunk(data.spotId)).then((bookedDates) => {
        setBookedDates(bookedDates);
      });
    });
  }, [dispatch, bookingId]);

  const updateBooking = async (e) => {
    e.preventDefault();
    const formattedStartDate = format(new Date(globalStartDate), "Y-MM-dd");
    const formattedEndDate = format(new Date(globalEndDate), "Y-MM-dd");
    const updatedBooking = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      numNights,
      numAdults,
      numChildren,
      numInfants,
      spotId: currentBooking.spotId,
    };
    await dispatch(updateBookingsThunk(bookingId, updatedBooking));
    history.push(`/bookings/${bookingId}`);
  };

  const goBack = (e) => {
    e.preventDefault();
    history.push(`/bookings/${currentBooking.id}`);
  };

  if (!currentBooking || !currentBooking.spot) return null;
  return (
    <div className="edit-booking-container">
      <h1>What do you want to change?</h1>
      <h3>We understand things happen and we're here for you!</h3>
      <div className="image-container edit-booking">
        <img src={currentBooking.spot.previewImage} />
      </div>
      <h2 style={{ marginBottom: "2px" }}>Reservation details</h2>
      <h4>Dates</h4>
      <ModalButton
        modalComponent={
          <Calendar minNights={currentBooking.spot.minNights} bookingIdKey={Number(bookingId)} />
        }
        buttonContent={
          <div
            className="start-end-display"
            style={{ border: "2px solid #c0c0c0", borderRadius: "5px", marginBottom: "15px" }}
          >
            <div className={`start-date-shell`} onClick={openCalendar}>
              <p id="checkin-text">CHECK-IN</p>
              <p id="start-date-text">
                {globalStartDate ? format(new Date(globalStartDate), "MM/dd/yyyy") : "Add Date"}
              </p>
            </div>
            <div className={`end-date-shell`} onClick={openCalendar}>
              <p id="checkout-text">CHECKOUT</p>
              <p id="end-date-text">
                {globalEndDate ? format(new Date(globalEndDate), "MM/dd/yyyy") : "Add Date"}
              </p>
            </div>
          </div>
        }
      />
      <h4>Guests</h4>
      <ModalButton
        modalComponent={
          <GuestCounter
            maxGuests={currentBooking.spot.maxGuests}
            guestList={{
              numAdults: currentBooking.numAdults,
              numChildren: currentBooking.numChildren,
              numInfants: currentBooking.numInfants,
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
        <button className="clear-button" onClick={(e) => goBack(e)}>
          Cancel
        </button>
        <button className="black-button" onClick={(e) => updateBooking(e)}>
          Confirm Changes
        </button>
      </div>
    </div>
  );
};

export default EditBookingForm;
