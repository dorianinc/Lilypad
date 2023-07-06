import { useLocation } from "react-router-dom";
import { useCounter } from "../../../context/CounterContext";
import "./GuestCounter.css";

const GuestCounter = ({ maxGuests }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const {
    numAdults,
    setNumAdults,
    numChildren,
    setNumChildren,
    numInfants,
    setNumInfants,
    occupancy,
    setOccupancy,
  } = useCounter();

  const handleOccupancy = (key, action) => {
    // let currentCount = 
    if (action === "add" && occupancy < maxGuests) {
      setOccupancy((prev) => prev + 1);
      localStorage.setItem("storedOccupancy", occupancy + 1);
      if (key === "adult") {
        setNumAdults((prev) => prev + 1);
        localStorage.setItem("storedNumAdults", numAdults + 1);
      }
      if (key === "child") {
        setNumChildren((prev) => prev + 1);
        localStorage.setItem("storedNumChildren", numChildren + 1);
      }
      if (key === "infant") {
        setNumInfants((prev) => prev + 1);
        localStorage.setItem("storedNumInfants", numInfants + 1);
      }
    } else if (action === "subtract") {
      if (key === "adult") {
        if (numAdults > 1) {
          setNumAdults((prev) => prev - 1);
          localStorage.setItem("storedNumAdults", numAdults - 1);
          setOccupancy((prev) => prev - 1);
          localStorage.setItem("storedOccupancy", occupancy - 1);
        }
      }
      if (key === "child") {
        if (numChildren > 0) {
          setNumChildren((prev) => prev - 1);
          localStorage.setItem("storedNumChildren", numChildren - 1);
          setOccupancy((prev) => prev - 1);
          localStorage.setItem("storedOccupancy", occupancy - 1);
        }
      }
      if (key === "infant") {
        if (numInfants > 0) {
          setNumInfants((prev) => prev - 1);
          localStorage.setItem("storedNumChildren", numChildren - 1);
          setOccupancy((prev) => prev - 1);
          localStorage.setItem("storedOccupancy", occupancy - 1);
        }
      }
    }
  };

  return (
    <div className={`num-guest-container ${!pathName.startsWith("/spots") && "bookings"}`}>
      {!pathName.startsWith("/spots") && (
        <div style={{ marginBottom: "5px" }}>
          <button className="x-mark guest-counter">
            <i class="fa-solid fa-xmark fa-xl" />
          </button>
          <h2>Guests</h2>
        </div>
      )}
      <div className="num-guests-content">
        <div className="guest-catagory">
          <div className="guest-key">
            <p style={{ fontWeight: "500" }}>Adults</p>
            <p style={{ fontSize: ".8rem" }}>Age 13+</p>
          </div>
          <div className="guest-values">
            <button
              className="plus-minus-button"
              onClick={() => handleOccupancy("adult", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>{numAdults}</p>
            <button className="plus-minus-button" onClick={() => handleOccupancy("adult", "add")}>
              <i class="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        <div className="guest-catagory">
          <div className="guest-key">
            <p style={{ fontWeight: "500" }}>Children</p>
            <p style={{ fontSize: ".8rem" }}>Ages 2-12</p>
          </div>
          <div className="guest-values">
            <button
              className="plus-minus-button"
              onClick={() => handleOccupancy("child", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>{numChildren}</p>
            <button className="plus-minus-button" onClick={() => handleOccupancy("child", "add")}>
              <i class="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        <div className="guest-catagory">
          <div className="guest-key">
            <p style={{ fontWeight: "500" }}>Infants</p>
            <p style={{ fontSize: ".8rem" }}>Under 2</p>
          </div>
          <div className="guest-values">
            <button
              className="plus-minus-button"
              onClick={() => handleOccupancy("infant", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>{numInfants}</p>
            <button className="plus-minus-button" onClick={() => handleOccupancy("infant", "add")}>
              <i class="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        <p style={{ fontSize: ".9rem", fontWeight: "500", textAlign: "center" }}>
          Maximum Occupancy: {maxGuests}
        </p>
      </div>
      {!pathName.startsWith("/spots") && (
        <div className="button-spaces-between">
          <button className="clear-button">Cancel</button>
          <button className="black-button">Save</button>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;
