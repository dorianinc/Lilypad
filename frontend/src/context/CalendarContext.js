import { createContext, useContext, useState } from "react";
export const CalendarContext = createContext();
export const useCalendar = () => useContext(CalendarContext);

export default function CalendarProvider({ children }) {
  const [onStartDate, setOnStartDate] = useState(true);
  const [startDate, setStartDate] = useState(localStorage.getItem("localStartDate"));
  const [endDate, setEndDate] = useState(localStorage.getItem("localEndDate"));
  const [booking, setBooking] = useState([
    {
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : new Date(""),
      color: "#5de373",
      key: "selection",
    },
  ]);

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