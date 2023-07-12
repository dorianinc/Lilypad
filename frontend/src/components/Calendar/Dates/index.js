import { useState } from "react";
import { useCalendar } from "../../../context/CalendarContext";
import { DateRange } from "react-date-range";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { format, addDays, getTime, isBefore, differenceInCalendarDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "./Dates.css";

const Dates = ({ bookingIdKey, minNights }) => {
  const [shownDateChangeValue, setShownDateChangeValue] = useState(new Date());
  const [isNextMonth, setIsNextMonth] = useState(true);
  const { bookedDates } = useCalendar();
  const { booking, setBooking } = useCalendar();
  const { setGlobalStartDate, setGlobalEndDate } = useCalendar();
  const { onStartDate, setOnStartDate } = useCalendar();
  const { setCalendarErrors } = useCalendar();

  const bookingConflicts = (requestDates) => {
    const requestedStart = new Date(requestDates.startDate).getTime();
    const requestedEnd = new Date(requestDates.endDate).getTime();
    for (let i = 0; i < bookedDates.length; i++) {
      let bookingId = bookedDates[i].id;
      let bookedStartDate = new Date(bookedDates[i].startDate).getTime();
      let bookedEndDate = new Date(bookedDates[i].endDate).getTime();
      if (requestedStart < bookedStartDate && requestedEnd > bookedEndDate) {
        if (bookingId !== bookingIdKey) return true;
      }
    }
    return false;
  };

  const bookedDays = (day) => {
    const utcDay = new Date(day.toLocaleDateString("sv-SE"));
    const currentDate = format(addDays(utcDay, 1), "MMM-dd-yyyy");
    if (bookedDates.length) {
      for (let i = 0; i < bookedDates.length; i++) {
        let bookingId = bookedDates[i].id;
        let formattedStartDate = format(bookedDates[i].startDate, "MMM-dd-yyyy");
        let formattedEndDate = format(bookedDates[i].endDate, "MMM-dd-yyyy");
        if (
          getTime(new Date(currentDate)) >= getTime(new Date(formattedStartDate)) &&
          getTime(new Date(currentDate)) <= getTime(new Date(formattedEndDate))
        ) {
          if (bookingId !== bookingIdKey) return true;
        }
      }
    }
  };

  const handleSelect = (ranges) => {
    const err = {};
    setCalendarErrors({});
    const { selection } = ranges;
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    setBooking([selection]);
    localStorage.setItem("storedStartDate", startDate);
    setGlobalStartDate(startDate);
    if (isBefore(startDate, endDate)) {
      setGlobalEndDate(endDate);
      localStorage.setItem("storedEndDate", endDate);
      if (differenceInCalendarDays(endDate, startDate) < minNights) {
        err.error = `Must book at least ${minNights} nights`;
        setCalendarErrors(err);
      }
      if (bookingConflicts({ startDate, endDate })) {
        err.error = "Requested dates conflict with existing booking";
        setCalendarErrors(err);
      }
    } else {
      localStorage.setItem("storedEndDate", "");
      setGlobalEndDate("");
    }
    setOnStartDate(false);
  };

  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          /*** call the transition when month changes ***/
          key={shownDateChangeValue}
          /*** code related to SwitchTransition ***/
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          /*** Set the transition class related to the user action ***/
          classNames={isNextMonth ? "fadeRightToLeft" : "fadeLeftToRight"}
        >
          <DateRange
            months={2} // number of months thats are displayed
            direction="horizontal" // direction the months flow
            fixedHeight={true} // keeps the calender a consistent height
            showDateDisplay={false} // hides the default start date - end date display
            showMonthAndYearPickers={false} // hides the dropdown option for months
            ranges={booking} // ** collects the start date and end date values **
            minDate={new Date()} // if less than minDate those days are disables
            focusedRange={onStartDate ? [0, 0] : [0, 1]} // [0,0] focuses the start date && [0,1] focuses the end date
            disabledDay={bookedDays} // passes days of the month into a function if that date returns a boolean of true, that date is disabled
            onChange={handleSelect} // handles on change after every date is selected
            shownDate={shownDateChangeValue} /*** set the current month ***/
            preventSnapRefocus={true} // keeps the calendar from rendering when you select a date in the 2nd month
            onShownDateChange={(month) => setShownDateChangeValue(month)} // used to make indicate a change for react-transitions to work
            // disabledDates={disabledDays} // takes the disables days array and disables the days // removed
          />
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Dates;
