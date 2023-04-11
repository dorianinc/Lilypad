import "./NewSpotPage.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";

function NewSpotPage() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); // this is for Title
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleImages = (value, bool) => {
    console.log("value 👉", value);
    console.log("bool 👉", bool);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const spot = { address, city, state, country, lat, lng, name, description, price };
    // console.table({country, address, city, state, lng, lat, description, name, price, previewImage})
    if (address === null || address === "") err.address = "Address is required";
    if (city === null || city === "") err.city = "City is required";
    if (state === null || state === "") err.state = "State is required";
    if (country === null || country === "") err.country = "Country is required";
    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (name === null || name === "") err.name = "Name is required";
    if (price === null || price === "" || price === 0) {
      err.price = "Price is required";
    }
    if (previewImage === null || previewImage === "") {
      err.previewImage = "Preview image is required";
    }
    if(!!Object.values(err).length){
        setErrors(err);
    }else{
        const newSpot = await dispatch(createSpotThunk(spot))
        console.log("newSpot 👉", newSpot)
        history.push(`/spots/${newSpot.id}`)
    }
  };

  return (
    <div className="mainContainer newSpot">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create a new Spot</h1>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact addres once they booked a reservation.</p>
        </div>
        <label>
          Country
          <input
            name="country"
            value={country}
            className="oneLiner"
            id="country"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <p className="errors">{errors.country}</p>
        <label>
          Street Address
          <input
            name="address"
            value={address}
            className="oneLiner"
            id="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <p className="errors">{errors.address}</p>
        <div className="flexedInputs">
          <label>
            City
            <input
              name="city"
              value={city}
              id="city"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <p className="errors">{errors.city}</p>
          <label>
            State
            <input
              name="state"
              value={state}
              id="state"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <p className="errors">{errors.state}</p>
        </div>
        <div className="flexedInputs">
          <label>
            Latitude
            <input
              name="lat"
              value={lat}
              id="latitude"
              placeholder="Latitude"
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          <p className="errors">{errors.lat}</p>
          <label>
            Longitude
            <input
              name="lng"
              value={lng}
              id="longitude"
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
            />
          </label>
          <p className="errors">{errors.lng}</p>
        </div>
        <hr />
        <h1>Describe your place to guests</h1>
        <p>
          Mention the best features of your space, any special amentities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>
        <textarea
          name="description"
          value={description}
          placeholder="Please write at least 30 characters"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="errors">{errors.description}</p>
        <hr />
        <h1>Create a title for your spot</h1>
        <p>
          Catch guests' attention with a spot title that highlights what makes your place special.
        </p>
        <label>
          <input
            name="name"
            value={name}
            className="oneLiner"
            id="name"
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p className="errors">{errors.name}</p>
        <hr />
        <h1>Set a base price for your spot</h1>
        <p>
          Competitive pricing can help your listing stand out and rank higher in search results.
        </p>
        <label className="flexLabel">
          ${" "}
          <input
            name="price"
            value={price}
            className="oneLiner"
            id="price"
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
          <p className="errors">{errors.price}</p>
        </label>
        <hr />
        <h1>Liven up your spot with photos</h1>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <label className="images">
          <input
            name="previewImage"
            value={previewImage}
            className="oneLiner"
            id="previewImage"
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          <p className="errors">{errors.previewImage}</p>
          <input
            name="url"
            value={url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={handleImages}
          />
          <input
            name="url"
            value={url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={handleImages}
          />
          <input
            name="url"
            value={url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={handleImages}
          />
          <input
            name="url"
            value={url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={handleImages}
          />
        </label>
        <hr />
        <div id="buttonContainer">
          <button id="createButton">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSpotPage;
