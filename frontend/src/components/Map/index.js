import { useState, useMemo, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";
import "./Map.css";

const Map = ({ spotLatLng, originLatLng }) => {
  const google = window.google;
  const [directions, setDirections] = useState();
  const center = useMemo(() => spotLatLng, [spotLatLng]);
  const mapOptions = { zoom: 19, center };


  useEffect(() => {
    if (!originLatLng || !spotLatLng) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: originLatLng,
        destination: spotLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }, [spotLatLng, originLatLng])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container">
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={spotLatLng} />
      </GoogleMap>
    </>
  );
};

export default Map;
