import { createSpotThunk, addImageThunk } from "../../../store/spotsReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen";
import DropZone from "../../DropZone";

function NewSpotPage() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lng] = useState(null);
  const [lat] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); // this is for Title
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {};
    const spot = { address, city, state, country, lat, lng, name, description, price };
    if (files.length <= 0) err.images = "Please add at least one image to your pad";
    setErrors(err);
    if (err.images) return;
    dispatch(createSpotThunk(spot))
      .then(async (newSpot) => {
        setIsLoading(true);
        if (!Object.values(err).length) {
          setIsLoading(true);
          const imagesArr = [];
          for (let i = 0; i < files.length; i++) {
            const image = files[i];
            if (i === 0) {
              imagesArr.push({ image, preview: true });
            } else {
              imagesArr.push({ image, preview: false });
            }
          }
          const spotImages = await dispatch(addImageThunk(newSpot.id, imagesArr));
          if (spotImages) {
            setIsLoading(false);
            history.push(`/spots/${newSpot.id}`);
          }
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          let errors = data.errors;
          err = { ...err, ...errors };
          setErrors(err);
        }
      });
  };

  return (
    <div className="spots-form-container new-spot">
      {isLoading && <LoadingScreen />}
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create a new Spot</h1>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact addres once they booked a reservation.</p>
        </div>
        <label className="country-label">
          Country
          <input
            name="country"
            value={country}
            className="one-liner"
            id="country"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <p className="errors">{errors.country}</p>
        </label>
        <label className="street-label">
          Street Address
          <input
            name="address"
            value={address}
            className="one-liner"
            id="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="errors">{errors.address}</p>
        </label>
        <div className="flex-inputs">
          <label className="city-label">
            City
            <input
              name="city"
              value={city}
              id="city"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <p className="errors">{errors.city}</p>
          </label>
          <label className="state-label">
            State
            <select id="state" name="state" onChange={(e) => setState(e.target.value)}>
              <option value="" style={{ color: "#7f7c79" }}>
                Select your option
              </option>
              {states.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>
            <p className="errors">{errors.state}</p>
          </label>
        </div>
        <hr className="lines form" />
        <h1>Describe your place to guests</h1>
        <p style={{ fontSize: "15px" }}>
          Mention the best features of your space, any special amentities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>
        <textarea
          name="description"
          className="text-area new-spot"
          value={description}
          placeholder="Please write at least 30 characters"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description}</p>
        <hr className="lines form" />
        <h1>Create a title for your spot</h1>
        <p>
          Catch guests' attention with a spot title that highlights what makes your place special.
        </p>
        <label className="nameLabel">
          <input
            name="name"
            value={name}
            className="one-liner"
            id="name"
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="errors">{errors.name}</p>
        </label>
        <hr className="lines form" />
        <h1>Set a base price for your spot</h1>
        <p>
          Competitive pricing can help your listing stand out and rank higher in search results.
        </p>
        <label className="priceLabel">
          ${" "}
          <input
            name="price"
            value={price}
            className="one-liner"
            id="price"
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <p className="errors">{errors.price}</p>
        <hr className="lines form" />
        <h1>Liven up your spot with photos</h1>
        <p>Upload up to 5 images</p>
        <div className="images">
          <DropZone files={files} setFiles={setFiles} />
          <p className="errors">{errors.images}</p>
        </div>
        <hr className="lines form" />
        <div className="buttonContainer">
          <button className="pink-button create" type="submit">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSpotPage;
