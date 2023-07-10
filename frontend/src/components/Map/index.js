// import dotenv from "dotenv";
import { useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";

const Map = ({ spotLat, spotLng }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } =
    useMap();

  const center = useMemo(
    () => ({ lat: Number(spotLat), lng: Number(spotLng) }),
    [spotLat, spotLng]
  );
  const mapOptions = {
    zoom: 19,
    center,
  };

  // useEffect(() => {
  //   setCurrentZoom(19);
  //   setCurrentLat(Number(spotLat));
  //   setCurrentLng(Number(spotLng));
  // }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container">
        <Marker position={{ lat: Number(spotLat), lng: Number(spotLng) }} />
      </GoogleMap>
    </>
  );
};

export default Map;
