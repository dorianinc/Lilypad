import { useEffect, useState } from "react";

const StarsRatingInput = ({ stars, onChange }) => {
  const [activeRating, setActiveRating] = useState(stars);

  useEffect(() => {
    setActiveRating(stars);
  }, [stars]);
  // NOTE: This useEffect isn't necessary to have for this scenario anymore
  // because the number input has been removed, but if you have a scenario which
  // requires this input to be re-rendered with an updated stars prop instead
  // of unmounted and remounted with an updated stars, then this useEffect is
  // necessary.

  return (
    <div className="ratingInput">
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(1);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(1);
        }}
      >
        <i
          className={activeRating >= 1 ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(2);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(2);
        }}
      >
        <i
          className={activeRating >= 2 ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(3);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(3);
        }}
      >
        <i
          className={
            activeRating >= 3 ? "fa-solid fa-star fa-lg fa-2xl" : "fa-regular fa-star fa-2xl"
          }
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(4);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(4);
        }}
      >
        <i
          className={activeRating >= 4 ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl"}
        />
      </div>
      <div
        className="goldStars"
        onMouseEnter={() => {
          setActiveRating(5);
        }}
        onMouseLeave={() => {
          setActiveRating(stars);
        }}
        onClick={() => {
          onChange(5);
        }}
      >
        <i
          className={activeRating >= 5 ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl"}
        />
      </div>
      <div>{"Stars"}</div>
    </div>
  );
};

export default StarsRatingInput;
