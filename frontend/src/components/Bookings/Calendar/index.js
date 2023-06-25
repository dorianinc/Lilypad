import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "./Calendar.css";

const Calendar = ({ setStartDate, setEndDate, setBooking, booking }) => {
  const bookedDays = [];

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    setBooking([selection]);
    setStartDate(startDate);
    console.log(startDate.getTime() < endDate.getTime())
    if (startDate < endDate) {
      setEndDate(endDate);
    }else{
      setEndDate("")
    }
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
    />
  );
};

export default Calendar;
