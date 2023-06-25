import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";
import "./Calendar.css";

const Calendar = () => {
  const [booking, setBooking] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      color: "#5de373",
      key: "selection",
    },
  ]);

  console.log("booking, 👉", booking);

  const bookedDays = [new Date('June 28, 2023 03:24:00')];
  

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setBooking([selection]);
  };
  return (
    <DateRange
      months={2}
      direction="horizontal"
      ranges={booking}
      minDate={new Date()}
      disabledDates={bookedDays}
      onChange={handleSelect}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
      moveRangeOnFirstSelection={false}
      retainEndDateOnFirstSelection={true}
    />
  );
};

export default Calendar;
