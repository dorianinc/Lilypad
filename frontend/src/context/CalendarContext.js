import { createContext, useContext, useState } from "react";

export const CalendarContext = createContext();
export const useCalendar = () => useContext(CalendarContext);

export default function CalendarProvider({ children }) {
  const [onStartDate, setOnStartDate] = useState(true);
  const [booking, setBooking] = useState([
    {
      startDate: null,
      endDate: new Date(""),
      color: "#5de373",
      key: "selection",
    },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <CalendarContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        onStartDate,
        setOnStartDate,
        booking,
        setBooking,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
