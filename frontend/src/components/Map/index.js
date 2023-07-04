// import dotenv from "dotenv";
import { useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";

const Map = ({ spot }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } =
    useMap();
  const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
  const mapOptions = {
    zoom: currentZoom,
    center,
  };

  useEffect(() => {
    setCurrentZoom(8);
    setCurrentLat(40.112206);
    setCurrentLng(-120.90653);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container"></GoogleMap>
    </>
  );
};

export default Map;