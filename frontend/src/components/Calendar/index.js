import { useCalendar } from "../../context/CalendarContext";
import { DateRange } from "react-date-range";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { format, addDays, getTime } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "./Calendar.css";

const Calendar = ({ bookings }) => {
  // // state created to hold the first month that calendar is showing
  // const [shownDateChangeValue, setShownDateChangeValue] = useState(new Date());
  // // state created to check if use created next Month ou previous month
  // const [isNextMonth, setIsNextMonth] = useState(true);
  const { onStartDate, setOnStartDate, booking, setBooking, setStartDate, setEndDate } =
    useCalendar();

  const disabledDays = [];
  const bookedDays = (day) => {
    // need to convert into utc or else there is a weird offset
    const utcDay = new Date(day.toLocaleDateString("sv-SE"));
    const currentDate = format(addDays(new Date(utcDay), 1), "MMM-dd-yyyy");
    if (bookings.length) {
      for (let i = 0; i < bookings.length; i++) {
        let startDate = format(addDays(new Date(bookings[i].startDate), 1), "MMM-dd-yyyy");
        let endDate = format(addDays(new Date(bookings[i].endDate), 1), "MMM-dd-yyyy");
        if (
          getTime(new Date(currentDate)) >= getTime(new Date(startDate)) &&
          getTime(new Date(currentDate)) <= getTime(new Date(endDate))
        ) {
          disabledDays.push(new Date(currentDate));
          return true;
        }
        return false;
      }
    }
  };

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    setBooking([selection]);
    localStorage.setItem("localStartDate", startDate);
    setStartDate(startDate);
    if (startDate.getTime() < endDate.getTime()) {
      localStorage.setItem("localEndDate", endDate);
      setEndDate(endDate);
    } else {
      localStorage.setItem("localEndDate", "");
      setEndDate("");
    }
    setOnStartDate(false);
  };

  return (
    <>
      <DateRange
        months={2} // number of months thats are displayed
        direction="horizontal" // direction the months flow
        ranges={booking} // ** collects the start date and end date values **
        minDate={new Date()} // if less than minDate those days are disables
        disabledDay={bookedDays} // pushed the days that should be disabled into an array
        disabledDates={disabledDays} // takes the disables days array and disables the days
        onChange={handleSelect} // handles on change after every date is selected
        showDateDisplay={false} // hides the default start date - end date display
        focusedRange={onStartDate ? [0, 0] : [0, 1]} // [0,0] focuses the start date && [0,1] focuses the end date
        showMonthAndYearPickers={false} // hides the dropdown option for months
        fixedHeight={true} // keeps the calender a consistent height
        preventSnapRefocus={true} // keeps the calendar from rendering when you select a date in the 2nd month
        // onShownDateChange={(month) => {
        //   // checks if user clicked next or previous month, this is used to trigger transitions
        //   const isNext = isAfter(month, shownDateChangeValue);
        //   setIsNextMonth(isNext ? true : false);
        //   setShownDateChangeValue(month);
        // }}
      />
    </>
  );
};

export default Calendar;
