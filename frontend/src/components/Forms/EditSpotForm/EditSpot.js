import { useState, useEffect } from "react";
import { getSingleSpotThunk, updateSpotThunk } from "../../../store/spotsReducer";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../../Forms/Forms.css'

function EditSpotPage() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lng] = useState(null);
  const [lat] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const { spotId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId)).then((spot) => {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    });
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots)[spotId];
  if (!spot || !spot.id) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const spotEdits = { address, city, state, country, lat, lng, name, description, price };
    if (address === null || address === "") err.address = "Address is required";
    if (city === null || city === "") err.city = "City is required";
    if (state === null || state === "") err.state = "State is required";
    if (country === null || country === "") err.country = "Country is required";
    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (name === null || name === "") err.name = "Name is required";
    if (price === null || price === "" || price === 0) {
      err.price = "Price is required";
    }

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      const updatedSpot = await dispatch(updateSpotThunk(spot, spotEdits));
      history.push(`/spots/${updatedSpot.id}`);
    }
  };

  return (
    <div className="mainContainer newSpot">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Update Spot</h1>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact addres once they booked a reservation.</p>
        </div>
        <label className="countryLabel">
          Country
          <input
            name="country"
            value={country}
            className="oneLiner"
            id="country"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <p className="errors">{errors.country}</p>
        </label>
        <label className="streetLabel">
          Street Address
          <input
            name="address"
            value={address}
            className="oneLiner"
            id="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="errors">{errors.address}</p>
        </label>
        <div className="flexedInputs">
          <label className="cityLabel">
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
          <label className="stateLabel">
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
        <hr />
        <h1>Describe your place to guests</h1>
        <p>
          Mention the best features of your space, any special amentities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>
        <textarea
          name="description"
          className="textArea newSpot"
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
        <label className="nameLabel">
          <input
            name="name"
            value={name}
            className="oneLiner"
            id="name"
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="errors">{errors.name}</p>
        </label>
        <hr />
        <h1>Set a base price for your spot</h1>
        <p>
          Competitive pricing can help your listing stand out and rank higher in search results.
        </p>
        <label className="priceLabel">
          ${" "}
          <input
            name="price"
            value={price}
            className="oneLiner"
            id="price"
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <p className="errors">{errors.price}</p>
        <hr />
        <div className="buttonContainer">
          <button className="pinkButton edit">Update your Spot</button>
        </div>
      </form>
    </div>
  );
}

export default EditSpotPage;
