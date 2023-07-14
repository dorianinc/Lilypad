import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import pin from "./lottie/lilypad-pindrop.json";
import house from "./lottie/lilypad-house.json";
import camera from "./lottie/lilypad-camera.json";
import LocationSearchInput from "../../LocationSearchInput";
import DropZone from "../../DropZone";
import "./SpotForm.css";

function SpotForm() {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lng] = useState(null);
  const [lat] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [minNights, setMinNights] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const prevSection = () => {
    if (sectionIndex === 0) return;
    setSectionIndex((prev) => prev - 1);
  };

  const nextSection = (section) => {
    const err = {};
    if (sectionIndex === 2) return;

    // part 1/3 of form --> location
    if (sectionIndex === 0) {
      const locationArr = location.split(",");
      const addressRegex = /^\d+\s+.*,\s*.*,?\s*.*,?\s*.*$/;
      if (location === null || location === "") {
        err.location = "Address is required";
      } else if (locationArr.length < 4 || !addressRegex.test(location.trim())) {
        err.location = "Enter a valid address";
      } else {
        setAddress(locationArr[0]);
        setCity(locationArr[1]);
        setState(locationArr[2]);
        setCountry(locationArr[3]);
      }

      // part 2/3 of form --> general info
    } else if (sectionIndex === 1) {
      // title
      if (title.length < 5 || description.length > 25)
        err.title = "Title must be 5-25 characters long";
      // description
      if (description.length < 100 || description.length > 600)
        err.description = "Description must be 100-600 characters long";
      // price
      if (price === null || price === "") {
        err.price = "Price is required";
      } else if ((price && isNaN(price)) || price <= 0) {
        err.price = "Input a valid price";
      }
      // number of guests
      if (maxGuests === null || maxGuests === "") {
        err.maxGuests = "# of guests is required";
      } else if (maxGuests && isNaN(maxGuests)) {
        err.maxGuests = "Input a valid # of guests";
      }
      // number of nights
      if (minNights === null || minNights === "") {
        err.minNights = "# of nights is required";
      } else if (minNights && isNaN(minNights)) {
        err.minNights = "Input a valid # of nights";
      }
    }
    if (!!Object.values(err).length) setErrors(err);
    else {
        setSectionIndex((prev) => prev + 1);
        setErrors({})
    }
  };

  const handleSubmit = () => {
    const err = {};
    if (files.length <= 0) {
      console.log("error");
      err.images = "Please add at least one image to your pad";
    }
    if (!!Object.values(err).length) setErrors(err);
    console.log("")
  };

  return (
    <div className="spot-form-container">
      <h1 style={{ alignSelf: "flex-start" }}>Create a new Pad...</h1>
      <div className="spot-form-content">
        {sectionIndex === 0 ? (
          <section id="spot-location">
            <div className="spot-form-left">
              <Lottie className="lottie-svg" loop={false} animationData={pin} />
            </div>
            <div className="spot-form-right">
              <div className="spot-form-sub-headers">
                <h2>Where's your pad located?</h2>
                <p>Guests will only get your exact address once they've booked a reservation.</p>
              </div>
              <div className="search-input-container">
                <LocationSearchInput
                  location={location}
                  setLocation={setLocation}
                  nameOfClass="location-input"
                />
                <p className="spot-form-errors">{errors.location}</p>
              </div>
            </div>
          </section>
        ) : sectionIndex === 1 ? (
          <section id="spot-info">
            <div className="spot-form-left">
              <Lottie className="lottie-svg" loop={false} animationData={house} />
            </div>
            <div className="spot-form-right">
              <div className="spot-form-sub-headers">
                <h2>Tell us about your pad</h2>
              </div>
              <label>
                Title
                <input
                  name="title"
                  value={title}
                  className="spot-form-one-liner"
                  id="title"
                  placeholder="Give your pad a catchy title to catch people's attention"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="spot-form-errors">{errors.title}</p>
              </label>
              Description
              <textarea
                name="description"
                className="spot-form-textarea"
                value={description}
                placeholder="Mention the best features of your space, any special amentities like fast wifi or parking,
          and what you love about the neighborhood."
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="spot-form-errors">{errors.description}</p>
              <div className="spot-form-flex-inputs">
                <label className="spot-form-price">
                  Price per night (USD)
                  <input
                    name="price"
                    value={price}
                    className="one-liner"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <p className="spot-form-errors">{errors.price}</p>
                </label>
                <label className="spot-form-guests">
                  Max # of guests
                  <input
                    name="maxGuests"
                    value={maxGuests}
                    className="one-liner"
                    id="max-guests"
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                  <p className="spot-form-errors">{errors.maxGuests}</p>
                </label>
                <label className="spot-form-nights">
                  Min # of nights
                  <input
                    name="minNights"
                    value={minNights}
                    className="one-liner"
                    id="min-nights"
                    onChange={(e) => setMinNights(e.target.value)}
                  />
                  <p className="spot-form-errors">{errors.minNights}</p>
                </label>
              </div>
            </div>
          </section>
        ) : (
          <section id="spot-location">
            <div className="spot-form-left">
              <Lottie className="lottie-svg" loop={false} animationData={camera} />
            </div>
            <div className="spot-form-right">
              <div className="spot-form-sub-headers">
                <h1>Liven up your spot with photos</h1>
                <p>Upload up to 5 images</p>
              </div>
              <DropZone files={files} setFiles={setFiles} />
              <p className="errors">{errors.images}</p>
            </div>
          </section>
        )}
        <div className="buttons-end">
          <button className="clear-button" onClick={prevSection}>
            Previous
          </button>
          {sectionIndex === 2 ? (
            <button className="black-button" onClick={handleSubmit}>
              Create Pad
            </button>
          ) : (
            <button className="black-button" onClick={nextSection}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpotForm;
