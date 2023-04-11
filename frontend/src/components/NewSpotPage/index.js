import "./NewSpotPage.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk, addImageThunk } from "../../store/spots";

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
  const [previewImage, setPreviewImage] = useState({ url: "", preview: 1 });
  const [image1, setImage1] = useState({ url: "", preview: 0 });
  const [image2, setImage2] = useState({ url: "", preview: 0 });
  const [image3, setImage3] = useState({ url: "", preview: 0 });
  const [image4, setImage4] = useState({ url: "", preview: 0 });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  // const newArray = new Array(5).fill(null);
  // const handleImages = (value, position) => {
  //   console.log("value 👉", value)
    
  //   if (position === 0) {
  //     setPreviewImage({ url: value, preview: 1 });
  //     newArray[0] = previewImage;
  //   }
  //   if (position === 1) {
  //     setImage1({ url: value, preview: 0 });
  //     newArray[1] = image1;
  //   }
  //   if (position === 2) {
  //     setImage2({ url: value, preview: 0 });
  //     newArray[2] = image2;
  //   }
  //   if (position === 3) {
  //     setImage3({ url: value, preview: 0 });
  //     newArray[3] = image3;
  //   }
  //   if (position === 4) {
  //     setImage4({ url: value, preview: 0 });
  //     newArray[4] = image4;
  //   }
  //   console.log("newArray 👉", newArray);
  //   // setImages(newArray);
  // };

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
    if (!!Object.values(err).length) {
      setErrors(err);
    } else {
      const newSpot = await dispatch(createSpotThunk(spot));
      console.log("newSpot id👉", newSpot.id);
      const images = [previewImage, image1, image2, image3, image4];
      for(let i = 0; i <= images.length; i++){
        const image = images[i]
        if(image.url){
          dispatch(addImageThunk(newSpot.id, image))
        }
      }
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
            value={previewImage.url}
            className="oneLiner"
            id="previewImage"
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage({ url: e.target.value, preview: 1 })}
          />
          <p className="errors">{errors.previewImage}</p>
          <input
            name="image1"
            value={image1.url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={(e) => setImage1({ url: e.target.value, preview: 0 })}
          />
          <input
            name="image2"
            value={image2.url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={(e) => setImage2({ url: e.target.value, preview: 0 })}
          />
          <input
            name="unage3"
            value={image3.url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={(e) => setImage3({ url: e.target.value, preview: 0 })}
          />
          <input
            name="image4"
            value={image4.url}
            className="oneLiner"
            id="image"
            placeholder="Image URL"
            onChange={(e) => setImage4({ url: e.target.value, preview: 0 })}
          />
        </label>
        <hr />
        <div id="buttonContainer">
          <button id="createButton">Create Spot</button>
        </div>
      </form>
    </div>
  );
}

export default NewSpotPage;

// setPreviewImage({ url: e.target.value, preview: 1 })
