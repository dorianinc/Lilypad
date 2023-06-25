import "./Bookings.css";

const Bookings = () => {
  return (
    <div className="bookings-container">
      <div className="start-date-container">
        <p id="checkin-text">CHECK-IN</p>
        <p id="start-date-text">Add Date</p>
      </div>
      <div className="end-date-container">
        <p id="checkout-text">CHECKOUT</p>
        <p id="end-date-text">Add Date</p>
      </div>
      <div className="calendar-container">
        <div className="month-container">
            
        </div>
      </div>
    </div>
  );
};

export default Bookings;
