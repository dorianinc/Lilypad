import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../store/reviewsReducer";

function DeleteReviewModal({ reviewId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    e.preventDefault();
    if (id) dispatch(deleteReviewThunk(id));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p style={{"margin-bottom": "15px"}}>Are you sure you want to delete this review?</p>
      <form className="loginForm">
        <button className="pink-button confirm" onClick={(e) => handleClick(e, reviewId)}>
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
