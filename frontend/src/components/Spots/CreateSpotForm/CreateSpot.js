import { createSpotThunk, addImageThunk, getSingleSpotThunk } from "../../../store/spotsReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const err = {};
    // const spot = { address, city, state, country, lat, lng, name, description, price };
    // if (address === null || address === "") err.address = "Address is required";
    // if (city === null || city === "") err.city = "City is required";
    // if (state === null || state === "") err.state = "State is required";
    // if (country === null || country === "") err.country = "Country is required";
    // if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    // if (name === null || name === "") err.name = "Name is required";
    // if (price === null || price === "" || price === 0) {
    //   err.price = "Price is required";
    // }

    // if (!!Object.values(err).length) {
    //   setErrors(err);
    // } else {
      // const newSpot = await dispatch(createSpotThunk(spot));
      const imagesArr = [];
      for (let i = 0; i < files.length; i++) {
        const image = files[i];
        if (i === 0) {
          imagesArr.push({ image, preview: true });
        } else {
          imagesArr.push({ image, preview: false });
        }
      }
      dispatch(addImageThunk(4, imagesArr));
      // history.push(`/spots/${newSpot.id}`);
    // }
  };

  return (
    <div className="spots-form-container new-spot">
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
            <input
              name="state"
              value={state}
              id="state"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
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
