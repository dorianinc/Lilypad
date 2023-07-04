import { createContext, useContext, useState } from "react";
export const CounterContext = createContext();
export const useCounter = () => useContext(CounterContext);

export default function CounterProvider({ children }) {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numInfants, setNumInfants] = useState(0);
  const [occupancy, setOccupancy] = useState(1);

  return (
    <CounterContext.Provider
      value={{
        numAdults,
        setNumAdults,
        numChildren,
        setNumChildren,
        numInfants,
        setNumInfants,
        occupancy,
        setOccupancy,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}
