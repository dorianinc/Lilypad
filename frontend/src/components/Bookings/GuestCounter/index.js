import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useCounter } from "../../../context/CounterContext";
import "./GuestCounter.css";

const GuestCounter = ({ maxGuests }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const { closeModal } = useModal();
  const { numAdults, setNumAdults } = useCounter();
  const { numChildren, setNumChildren } = useCounter();
  const { numInfants, setNumInfants } = useCounter();
  const { occupancy, setOccupancy } = useCounter();
  const [localNumAdults, setLocalNumAdults] = useState(numAdults);
  const [localNumChildren, setLocalNumChildren] = useState(numChildren);
  const [localNumInfants, setLocalNumInfants] = useState(numInfants);
  const [localOccupancy, setLocalOccupancy] = useState(occupancy);

  const handleGuestList = (key, action) => {
    // if action is add and local occupancy count is less than max guest count
    if (action === "add" && localOccupancy < maxGuests) {
      // increment local count by 1
      setLocalOccupancy((prev) => prev + 1);
      // if we are in the spot details component...
      if (pathName.startsWith("/spots")) {
        // we also increment the global count
        setOccupancy((prev) => prev + 1);
        // we then set that count to local storage
        localStorage.setItem("storedOccupancy", occupancy + 1);
      }
      // if key is adult ...
      if (key === "adult") {
        // increment adult count by 1
        setLocalNumAdults((prev) => prev + 1);
        // if we are in the spot details component...
        if (pathName.startsWith("/spots")) {
          // we also increment the global count
          setNumAdults((prev) => prev + 1);
          // we then set that count to local storage
          localStorage.setItem("storedNumAdults", numAdults + 1);
        }
      }
      // if key is child ...
      if (key === "child") {
        // increment child count by 1
        setLocalNumChildren((prev) => prev + 1);
        // if we are in the spot details component...
        if (pathName.startsWith("/spots")) {
          // we also increment the global count
          setNumChildren((prev) => prev + 1);
          // we then set that count to local storage
          localStorage.setItem("storedNumChildren", numChildren + 1);
        }
      }
      // if key is child ...
      if (key === "infant") {
        // increment infant count by 1
        setLocalNumInfants((prev) => prev + 1);
        // if we are in the spot details component...
        if (pathName.startsWith("/spots")) {
          // we also increment the global count
          setNumInfants((prev) => prev + 1);
          // we then set that count to local storage
          localStorage.setItem("storedNumInfants", numInfants + 1);
        }
      }
      // else if action is subtract
    } else if (action === "subtract") {
      // if key is adults ...
      if (key === "adult") {
        if (localNumAdults > 1) {
          // decrement adult count and occupancy count by 1
          setLocalNumAdults((prev) => prev - 1);
          setLocalOccupancy((prev) => prev - 1);
          // if we are in the spot details component...
          if (pathName.startsWith("/spots")) {
            // we also decrement the global count
            setNumAdults((prev) => prev - 1);
            setOccupancy((prev) => prev - 1);
            // we then set that count to local storage
            localStorage.setItem("storedNumAdults", numAdults - 1);
            localStorage.setItem("storedOccupancy", occupancy - 1);
          }
        }
      }
      // if key is child ...
      if (key === "child") {
        if (localNumChildren > 0) {
          // decrement child count and occupancy count by 1
          setLocalNumChildren((prev) => prev - 1);
          setLocalOccupancy((prev) => prev - 1);
          // if we are in the spot details component...
          if (pathName.startsWith("/spots")) {
            // we also decrement the global count
            setNumChildren((prev) => prev - 1);
            setOccupancy((prev) => prev - 1);
            // we then set that count to local storage
            localStorage.setItem("storedNumChildren", numChildren - 1);
            localStorage.setItem("storedOccupancy", occupancy - 1);
          }
        }
      }
      // if key is infant ...
      if (key === "infant") {
        if (localNumInfants > 0) {
          // decrement child count and occupancy count by 1
          setLocalNumInfants((prev) => prev - 1);
          setLocalOccupancy((prev) => prev - 1);
          // if we are in the spot details component...
          if (pathName.startsWith("/spots")) {
            // we also decrement the global count
            setNumInfants((prev) => prev - 1);
            setOccupancy((prev) => prev - 1);
            // we then set that count to local storage
            localStorage.setItem("storedNumChildren", numChildren - 1);
            localStorage.setItem("storedOccupancy", occupancy - 1);
          }
        }
      }
    }
  };

  const setGuestList = () => {
    setNumAdults(localNumAdults);
    setNumChildren(localNumChildren);
    setNumInfants(localNumInfants);
    setOccupancy(localOccupancy);
    closeModal();
  };

  //----------------------------------------------------------------------------------------------------------//
  // Sets the global guestlist variables if we are in a spot's detail page //
  // Spot details page does not have a confirm/save button so this is the only way to set guestlist variables
  // useEffect(() => {
  //   if (pathName.startsWith("/spots")) {
  //     setNumAdults(localNumAdults);
  //     localStorage.setItem("storedNumAdults", localNumAdults);
  //   }
  // }, [localNumAdults]);

  // useEffect(() => {
  //   if (pathName.startsWith("/spots")) {
  //     setNumChildren(localNumChildren);
  //     localStorage.setItem("storedChildren", localNumChildren);
  //   }
  // }, [localNumChildren]);

  // useEffect(() => {
  //   if (pathName.startsWith("/spots")) {
  //     setNumInfants(localNumInfants);
  //     localStorage.setItem("storedInfants", localNumInfants);
  //   }
  // }, [localNumInfants]);

  // useEffect(() => {
  //   if (pathName.startsWith("/spots")) {
  //     setOccupancy(localOccupancy);
  //     localStorage.setItem("storedOccupancy", localOccupancy);
  //   }
  // }, [localOccupancy]);
  //----------------------------------------------------------------------------------------------------------//

  return (
    <div className={`num-guest-container ${!pathName.startsWith("/spots") && "bookings"}`}>
      {!pathName.startsWith("/spots") && (
        <div style={{ marginBottom: "5px" }}>
          <button className="x-mark guest-counter" onClick={closeModal}>
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
              onClick={() => handleGuestList("adult", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
              {localNumAdults}
            </p>
            <button className="plus-minus-button" onClick={() => handleGuestList("adult", "add")}>
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
              onClick={() => handleGuestList("child", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
              {localNumChildren}
            </p>
            <button className="plus-minus-button" onClick={() => handleGuestList("child", "add")}>
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
              onClick={() => handleGuestList("infant", "subtract")}
            >
              <i class="fa-solid fa-minus" />
            </button>
            <p style={{ minWidth: "15px", maxWidth: "15px", textAlign: "center" }}>
              {localNumInfants}
            </p>
            <button className="plus-minus-button" onClick={() => handleGuestList("infant", "add")}>
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
          <button className="clear-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="black-button" onClick={setGuestList}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestCounter;
