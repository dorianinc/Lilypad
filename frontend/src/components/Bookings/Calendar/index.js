import { useCalendar } from "../../../context/CalendarContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "./Calendar.css";

const Calendar = ({ bookings }) => {
  const { onStartDate, setOnStartDate, booking, setBooking, setStartDate, setEndDate } =
    useCalendar();

    const disabledDays = []
  const bookedDays = (day) => {
    // one days worth of milliseconds
    const oneDay = 86400000;
    // convert day into utc form in order to match booked days format
    const utcDay = new Date(day.toLocaleDateString("sv-SE"));
    const formattedDay = utcDay.getTime() + oneDay;
    if (bookings.length) {
      for (let i = 0; i < bookings.length; i++) {
        // initally startDate and endDate are off by one day
        let startDate = new Date(bookings[i].startDate);
        let endDate = new Date(bookings[i].endDate);
        // we convert the dates into milliseconds then add one day
        let formattedStartDate = startDate.getTime() + oneDay;
        let formattedEndDate = endDate.getTime() + oneDay;
        
        if (formattedDay >= formattedStartDate && formattedDay <= formattedEndDate) {
          disabledDays.push(new Date(formattedDay))
          return true
        }
      }
    }
  };
  
  const handleSelect = (ranges) => {
    const { selection } = ranges;
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    setBooking([selection]);
    setStartDate(startDate);
    if (startDate.getTime() < endDate.getTime()) {
      setEndDate(endDate);
    } else {
      setEndDate("");
    }
    setOnStartDate(false);
  };

  return (
    <DateRange
      months={2} // number of months thats are displayed
      direction="horizontal" /// direction the months flow
      ranges={booking} // ** collects the start date and end date values **
      minDate={new Date()} // if less than minDate those days are disables
      disabledDay={bookedDays} // pushed the days that should be disabled into an array
      disabledDates={disabledDays} // takes the disables days array and disables the days
      onChange={handleSelect} // handles on change after every date is selected
      showDateDisplay={false} // hides the default start date - end date display
      focusedRange={onStartDate ? [0, 0] : [0, 1]} // [0,0] focuses the start date && [0,1] focuses the end date
      showMonthAndYearPickers={false} /// hides the dropdown option for months
      fixedHeight={true} // keeps the calender a consistent height
    />
  );
};

export default Calendar;
