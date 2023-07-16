import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { getSingleBookingsThunk } from "../../../store/bookingsReducer";
import DeleteBooking from "../../Modals/DeleteBooking";
import ModalButton from "../../Modals/ModalButton";
import Map from "../../Map";
import "./BookingDetails.css";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [originLatLng, setOriginLatLng] = useState({});
  const booking = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getSingleBookingsThunk(bookingId));
    document.querySelector(".content-container").style.padding = "0px 0px";
    return () => {
      document.querySelector(".content-container").style.padding = "25px 10px";
    };
  }, [dispatch, bookingId]);

  const goBack = () => {
    history.push("/bookings");
  };

  const goToEdit = () => {
    history.push(`/bookings/${bookingId}/edit`);
  };

  const getDirections = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setOriginLatLng({ lat, lng });
      },
      // (error) => console.log(error)
    );
  };

  if (!booking || !booking.spot) return null;
  const formattedStartDate = format(booking.startDate, "EE, MMM do");
  const formattedEndDate = format(booking.endDate, "EE, MMM do");
  return (
    <div className="booking-details-section">
      <div className="booking-details-content">
        <div className="booking-details-image">
          <img loading="lazy" src={booking.spot.previewImage} />
          <div className="booking-image-overlay">
            <button className="booking-back-button" onClick={goBack}>
              <i class="fa-solid fa-arrow-left fa-2xl" />
            </button>
            <h2 style={{ fontSize: "1.7rem", color: "#fff", fontWeight: "500" }}>
              You're all set for {booking.spot.city}
            </h2>
          </div>
        </div>
        <div className="booking-details-info">
          <div className="booking-details-dates">
            <div className="booking-checkin-checkout">
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>Check-in</p>
              <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                {formattedStartDate}
              </p>
            </div>
            <hr style={{ border: "1px solid #d2d2d2", margin: "0 10px" }} />
            <div className="booking-checkin-checkout">
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>Checkout</p>
              <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                {formattedEndDate}
              </p>
            </div>
          </div>
          <hr style={{ border: "1px solid #d2d2d2" }} />
          <div className="bookings-details-menu">
            <div className="booking-details-menu-section clickable" onClick={getDirections}>
              <i class="fa-solid fa-location-dot fa-2xl booking-icon" />
              <div className="booking-details-meu-content">
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Getting there</p>
                <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                  Address: {booking.spot.address}
                </p>
              </div>
            </div>
            <hr style={{ border: "1px solid #d2d2d2" }} />
            <div className="booking-details-menu-section clickable" onClick={goToEdit}>
              <i class="fa-solid fa-pen-to-square fa-2xl booking-icon" />
              <div className="booking-details-meu-content">
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Change Booking</p>
                <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                  Customize your bookings for the perfect stay
                </p>
              </div>
            </div>
            <hr style={{ border: "1px solid #d2d2d2" }} />
            <ModalButton
              modalComponent={<DeleteBooking bookingId={bookingId} />}
              buttonContent={
                <>
                  <div className="booking-details-menu-section clickable">
                    <i class="fa-regular fa-calendar-xmark fa-2xl booking-icon" />
                    <div className="booking-details-meu-content">
                      <p style={{ fontSize: "1rem", fontWeight: "500" }}>Cancel Booking</p>
                      <p style={{ fontSize: "1rem", fontWeight: "500", color: "#888888" }}>
                        We get it, you hate fun.
                      </p>
                    </div>
                  </div>
                </>
              }
            />
            <hr style={{ border: "1px solid #d2d2d2" }} />
          </div>
        </div>
      </div>
      <section className="map-section">
        <Map
          spotLatLng={{ lat: Number(booking.spot.lat), lng: Number(booking.spot.lng) }}
          originLatLng={originLatLng}
        />
      </section>
    </div>
  );
};

export default BookingDetails;
