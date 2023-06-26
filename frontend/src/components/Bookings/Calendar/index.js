import { useCalendar } from "../../../context/CalendarContext";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "./Calendar.css";

const Calendar = ({ bookings }) => {
  const { onStartDate, setOnStartDate, booking, setBooking, setStartDate, setEndDate } =
    useCalendar();

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
          return true;
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
      months={2}
      direction="horizontal"
      ranges={booking}
      minDate={new Date()}
      disabledDay={bookedDays}
      onChange={handleSelect}
      showDateDisplay={false}
      focusedRange={onStartDate ? [0, 0] : [0, 1]} // [0,0] focuses the start date && [0,1] focuses the end date
      showMonthAndYearPickers={false}
    />
  );
};

export default Calendar;
