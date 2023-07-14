import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "./LocationSearchInput.css"

const LocationSearchInput = ({ location, setLocation, nameOfClass }) => {

  const handleChange = (value) => {
    setLocation(value);
  };

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng.lat))
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete value={location} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="auto-complete-container">
          <input
            {...getInputProps({
              placeholder: "123 Lilypad Drive, Ribbit, CA, USA",
              className: "auto-complete-input"
            })}
          />
          {suggestions.length ? (
          <div className="auto-complete-dropdown">
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
                  <span onClick={(e) => setLocation(suggestion.description)}>
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>

          ): null}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
