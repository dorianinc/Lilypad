import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { postReviewThunk } from "../../../store/reviews";
import StarsRatingInput from "./StarsRatingInput/StarsRatingInput";

function CreateReviewModal({ spotId }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errorsObj, setErrorsObj] = useState({});
  const [buttonClass, setButtonClass] = useState("pinkButton disabled");
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (review.length >= 10 && stars >= 1) {
      setButtonClass("pinkButton");
    }
  }, [review, stars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { review, stars };
    return dispatch(postReviewThunk(spotId, newReview))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrorsObj(data.errors);
        }
      });
  };

  const errors = Object.values(errorsObj);
  const onChange = (number) => {
    setStars(parseInt(number));
  };

  return (
    <>
      <h1>How was your stay?</h1>
      {errors.map((error, i) => (
        <p key={i} className="errors">
          {error}
        </p>
      ))}
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="description"
          className="textArea review"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
        <StarsRatingInput onChange={onChange} stars={stars} />
        <button className={buttonClass} disabled={buttonClass.includes("disabled")}>
          Submit Your Review
        </button>
      </form>
    </>
  );
}

export default CreateReviewModal;
