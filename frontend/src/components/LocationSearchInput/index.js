import { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationSearchInput = ({nameOfClass}) => {
  const [address, setAddress] = useState();

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng.lat))
      .catch((error) => console.error("Error", error));
  };


  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: nameOfClass,
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span onClick={(e) => setAddress(suggestion.description)}>
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
