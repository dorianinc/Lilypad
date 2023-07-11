import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../store/reviewsReducer";

function DeleteReviewModal({ spotId, reviewId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId, spotId));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p style={{"marginBottom": "15px"}}>Are you sure you want to delete this review?</p>
      <form className="loginForm">
        <button className="pink-button confirm" onClick={(e) => handleClick(e)}>
          Yes (Delete Review)
        </button>
        <button className="grey-button reject" onClick={(e) => handleClick(e)}>
          No (Keep Review)
        </button>
      </form>
    </div>
  );
}

export default DeleteReviewModal;
