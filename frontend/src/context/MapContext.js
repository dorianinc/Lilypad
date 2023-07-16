import { createContext, useContext, useState } from "react";

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }) {
  const [spotLngLat, setSpotLngLat] = useState();
  const [userLngLat, setUserLngLat] = useState();

  return (
    <MapContext.Provider
      value={{
        spotLngLat,
        setSpotLngLat,
        userLngLat,
        setUserLngLat,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
