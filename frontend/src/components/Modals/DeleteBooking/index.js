import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBookingThunk } from "../../../store/bookingsReducer";

function DeleteBooking({ bookingId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteBookingThunk(bookingId));
    closeModal();
    history.push("/bookings")
  };

  return (
    <>
      <h1>Confirm Cancellation</h1>
      <p style={{"margin-bottom": "15px"}}>Are you sure you want to cancel this booking?</p>
      <form className="loginForm">
        <button className="pink-button confirm" onClick={(e) => handleClick(e)}>
          Yes (Cancel Booking)
        </button>
        <button className="grey-button reject" onClick={closeModal}>
          No (Keep Booking)
        </button>
      </form>
    </>
  );
}

export default DeleteBooking;
