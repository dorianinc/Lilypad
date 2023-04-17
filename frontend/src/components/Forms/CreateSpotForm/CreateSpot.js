import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk, addImageThunk, getSingleSpotThunk } from "../../../store/spotsReducer";
import "../../Forms/Forms.css";

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
  const [previewImage, setPreviewImage] = useState({ url: "", preview: 1 });
  const [image1, setImage1] = useState({ url: "", preview: 0 });
  const [image2, setImage2] = useState({ url: "", preview: 0 });
  const [image3, setImage3] = useState({ url: "", preview: 0 });
  const [image4, setImage4] = useState({ url: "", preview: 0 });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const spot = { address, city, state, country, lat, lng, name, description, price };
    if (address === null || address === "") err.address = "Address is required";
    if (city === null || city === "") err.city = "City is required";
    if (state === null || state === "") err.state = "State is required";
    if (country === null || country === "") err.country = "Country is required";
    if (description.length < 30) err.description = "Description needs a minimum of 30 characters";
    if (name === null || name === "") err.name = "Name is required";
    if (price === null || price === "" || price === 0) {
      err.price = "Price is required";
    }
    /// images ///
    const imageExtensionRegex = /\.(gif|jpe?g|png|bmp|svg)$/i;
    if (previewImage.url === null || previewImage.url === "") {
      err.previewImage = "Preview image is required";
    }
    if (previewImage.url.length > 0 && !imageExtensionRegex.test(previewImage.url)) {
      err.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image1.url.length > 0 && !imageExtensionRegex.test(image1.url)) {
      err.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image2.url.length > 0 && !imageExtensionRegex.test(image2.url)) {
      err.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image3.url.length > 0 && !imageExtensionRegex.test(image3.url)) {
      err.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image4.url.length > 0 && !imageExtensionRegex.test(image4.url)) {
      err.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      const newSpot = await dispatch(createSpotThunk(spot));
      const images = [previewImage, image1, image2, image3, image4];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.url) {
          dispatch(addImageThunk(newSpot.id, image));
        }
      }
      const returnedSpot = await dispatch(getSingleSpotThunk(spot.id));
      history.push(`/spots/${returnedSpot.id}`);
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
        <hr className="lines form" />
        <h1>Describe your place to guests</h1>
        <p style={{ fontSize: "15px" }}>
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
        <hr className="lines form" />
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
            className="oneLiner"
            id="price"
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <p className="errors">{errors.price}</p>
        <hr className="lines form" />
        <h1>Liven up your spot with photos</h1>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="images">
          <label className="imagesLabel">
            <input
              name="previewImage"
              value={previewImage.url}
              className="oneLiner"
              id="previewImage"
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage({ url: e.target.value, preview: 1 })}
            />
            <p className="errors">{errors.previewImage}</p>
          </label>
          <label className="imagesLabel">
            <input
              name="image1"
              value={image1.url}
              className="oneLiner"
              id="image"
              placeholder="Image URL"
              onChange={(e) => setImage1({ url: e.target.value, preview: 0 })}
            />
            <p className="errors">{errors.image1}</p>
          </label>
          <label className="imagesLabel">
            <input
              name="image2"
              value={image2.url}
              className="oneLiner"
              id="image"
              placeholder="Image URL"
              onChange={(e) => setImage2({ url: e.target.value, preview: 0 })}
            />
            <p className="errors">{errors.image2}</p>
          </label>
          <label className="imagesLabel">
            <input
              name="image3"
              value={image3.url}
              className="oneLiner"
              id="image"
              placeholder="Image URL"
              onChange={(e) => setImage3({ url: e.target.value, preview: 0 })}
            />
            <p className="errors">{errors.image3}</p>
          </label>
          <label className="imagesLabel">
            <input
              name="image4"
              value={image4.url}
              className="oneLiner"
              id="image"
              placeholder="Image URL"
              onChange={(e) => setImage4({ url: e.target.value, preview: 0 })}
            />
            <p className="errors">{errors.image4}</p>
          </label>
        </div>
        <hr className="lines form" />
        <div className="buttonContainer">
          <button className="pinkButton create">Create Spot</button>
        </div>
      </form>
    </div>
  );
}

export default NewSpotPage;

// setPreviewImage({ url: e.target.value, preview: 1 })
