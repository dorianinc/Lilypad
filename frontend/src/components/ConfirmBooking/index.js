import { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spotsReducer";
import { createBookingsThunk } from "../../store/bookingsReducer";
import { useCalendar } from "../../context/CalendarContext";
import { format } from "date-fns";
import "./ConfirmBooking.css";

const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const { startDate, endDate } = useCalendar();

  const frogFacts = [
    "Most frogs can jump 20 times their body length.",
    "Frogs breathe through their skin.",
    " Some frogs change color.",
    "Frogs live on every continent except Antarctica.",
    "Frogs have been on Earth since the age of dinosaurs.",
    "Some frogs spend part of their lives frozen solid.",
  ];
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots);
  const formattedStartDate = format(new Date(startDate), "MMM do");
  const formattedEndDate = format(new Date(endDate), "MMM do");

  const numNights = Math.round(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
  );
  const price = Number(spot.price * numNights).toFixed(2);
  const taxes = (price / 14.25).toFixed(2);
  const total = Number(price) + Number(taxes);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
  }, [dispatch]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    const formattedStartDate = format(startDate, "Y-MM-dd");
    const formattedEndDate = format(endDate, "Y-MM-dd");
    const requestedDates = { startDate: formattedStartDate, endDate: formattedEndDate };
    await dispatch(createBookingsThunk(spotId, requestedDates));
    history.push(`/bookings`);
  };

  if (!spot.id) return null;
  return (
        <div className="confirmation-container">
          <div className="confirmation-header-container">
            <button className="back-button">
              <i class="fa-solid fa-chevron-left fa-lg" />
            </button>
            <h1 className="confirmation-header">Confirm and pay</h1>
          </div>
          <div className="confirmation-content">
            <div className="confirmation-left">
              <div className="confirmation-greeting">
                <div className="greeting-text">
                  <h3>Great choice, have a frog fact!</h3>
                  <p>{frogFacts[Math.floor(Math.random() * frogFacts.length)]}</p>
                </div>
                <img className="lily-the-frog" alt="cute-frog" src="/images/cute-frog2.png" />
              </div>
              <h2 className="section-header">Your trip</h2>
              <div className="booking-options">
                <div className="booking-days">
                  <div>
                    <h4 style={{ fontWeight: "600" }}>Dates</h4>
                    {`${formattedStartDate} - ${formattedEndDate}`}
                  </div>
                  <p className="edit-tags">Edit</p>
                </div>
                <div className="booking-guests">
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Guests</h4>
                    <p style={{ fontWeight: "300" }}>1 guest</p>
                  </div>
                  <p className="edit-tags">Edit</p>
                </div>
              </div>
              <hr className="section-divider" />
              <div className="travel-insurance-section">
                <h2 className="section-header">Travel Insurance</h2>
                <div className="travel-insurance-option">
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Add peace of mind for $200.00</h4>
                    <p style={{ color: "#aaaaaa", fontWeight: "400" }}>
                      Only available while booking.
                    </p>
                  </div>
                  <input type="checkbox" id="insurance-check" />
                </div>
                <p style={{ fontSize: ".9rem", marginTop: "10px" }}>
                  Get reimbursed if you need to cancel due to illness, flight delays, and more.
                </p>
              </div>
              <hr className="section-divider" />
              <div className="payment-section" style={{ marginBottom: "10px" }}>
                <h2 className="section-header">Choose how to pay</h2>
                <div className="payment-options-container">
                  <div className="payment-option">
                    <div>
                      <h4 style={{ fontWeight: "500" }}>Pay in full</h4>
                      <p style={{ fontWeight: "300", fontSize: ".9rem" }}>
                        Pay the total (${total}) now and you're all set.
                      </p>
                    </div>
                    <input type="radio" id="insurance-check" name="payment" />
                  </div>
                  <hr style={{ border: "1px solid #d2d2d2" }} />
                  <div className="payment-option">
                    <div>
                      <h4 style={{ fontWeight: "500" }}>Pay with friendship</h4>
                      <p style={{ fontWeight: "300", fontSize: ".9rem" }}>
                        Not our favorite option, but we'll take it.
                      </p>
                    </div>
                    <input type="radio" id="insurance-check" name="payment" />
                  </div>
                  <hr style={{ border: "1px solid #d2d2d2" }} />
                  <div className="payment-option">
                    <div>
                      <h4 style={{ fontWeight: "500" }}>Pay with flies</h4>
                      <p style={{ fontWeight: "300", fontSize: ".9rem" }}>
                        Pay in form of yummy flies! Preferably fruit flies.
                      </p>
                    </div>
                    <input type="radio" id="insurance-check" name="payment" />
                  </div>
                </div>
              </div>
              <hr className="section-divider" />
              <div className="message-section">
                <h2 className="section-header">Before for your trip</h2>
                <h4 style={{ fontWeight: "500" }}>Message from the Host</h4>
                <p style={{ fontWeight: "300", marginBottom: "15px" }}>
                  Welcome to your lilypad Away from Home!
                </p>
                <div className="message-content">
                  <h4 style={{ fontWeight: "500" }}> Dear {user.firstName},</h4>
                  <p className="owners-message">
                    Welcome to our cozy retreat! We are thrilled to have you as our guest and want
                    to ensure that your stay with us is nothing short of exceptional.
                    <br />
                    <br />
                    If you have any questions or need assistance during your stay, please don't
                    hesitate to reach out. We are here to make your experience as comfortable and
                    enjoyable as possible. We hope you find our property to be a perfect sanctuary,
                    offering all the amenities and comforts you need. Whether you're here for a
                    relaxing getaway or to explore the vibrant city, we're confident that you'll
                    feel right at home.
                    <br />
                    <br />
                    Once again, welcome to your home away from home!
                  </p>
                </div>
                <hr className="section-divider" />
                <div style={{ display: "flex" }}>
                  <button
                    className="pink-button confirmation"
                    style={{ marginBottom: "20px" }}
                    onClick={(e) => confirmBooking(e)}
                  >
                    Confirm and Pay
                  </button>
                </div>
              </div>
            </div>
            <div className="confirmation-right">
              <div className="confirmation-spot-card">
                <div className="confirmation-spot-card-top">
                  <img alt="spot-preview" id="card-image" src={spot.SpotImages[0].url} />
                  <div className="spot-card-info">
                    <p style={{ fontWeight: "500" }}>{spot.name}</p>

                    <p style={{ fontSize: ".8rem" }}>
                      <i class="fa-solid fa-star fa-sm" /> {Number(spot.avgStarRating).toFixed(2)}
                      <span style={{ color: "#888888" }}>({spot.numReviews} reviews)</span>
                    </p>
                  </div>
                </div>
                <hr className="section-divider" />
                <div className="spot-card-invoice">
                  <h2 className="section-header">Price details</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "300",
                      marginBottom: "15px",
                    }}
                  >
                    <p>{`$${spot.price} x ${numNights} nights`}</p>
                    <p>${price}</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", fontWeight: "300" }}
                  >
                    <p>Taxes</p>
                    <p>${taxes}</p>
                  </div>
                </div>
                <hr className="section-divider" />

                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", fontWeight: "500" }}
                  >
                    <p>Total(USD)</p>
                    <p>${total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default ConfirmBooking;
