import { createContext, useContext, useState } from "react";

export const MapContext = createContext();
export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }) {
  const [currentZoom, setCurrentZoom] = useState(5);
  const [currentLat, setCurrentLat] = useState();
  const [currentLng, setCurrentLng] = useState();


  return (
    <MapContext.Provider
      value={{
        currentZoom,
        setCurrentZoom,
        currentLat,
        setCurrentLat,
        currentLng,
        setCurrentLng
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
