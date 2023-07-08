import { useState, useEffect } from "react";
import { useCalendar } from "../../../context/CalendarContext";
import { DateRange } from "react-date-range";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import {
  format,
  addDays,
  getTime,
  isAfter,
  isBefore,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "./Dates.css";

const Dates = ({ minNights }) => {
  const [shownDateChangeValue, setShownDateChangeValue] = useState(new Date());
  const [isNextMonth, setIsNextMonth] = useState(true);
  const {
    onStartDate,
    setOnStartDate,
    booking,
    setBooking,
    setStartDate,
    setEndDate,
    bookedDates,
    setCalendarErrors,
  } = useCalendar();

  const [state, setState] = useState(booking);

  const setFocusedRange = (focusedRange) => {
    setState((state) => {
      return { ...state, focusedRange };
    });
  };

  const handleSelect = (ranges) => {
    setCalendarErrors({});
    const { selection } = ranges;
    const startDate = selection.startDate;
    const endDate = selection.endDate;
    setBooking([selection]);
    localStorage.setItem("storedStartDate", startDate);
    setStartDate(startDate);
    if (isBefore(startDate, endDate)) {
      setEndDate(endDate);
      localStorage.setItem("storedEndDate", endDate);
      if (differenceInCalendarDays(endDate, startDate) < minNights) {
        const err = {};
        err.numNights = `Must book at least ${minNights} nights`;
        setCalendarErrors(err);
      }
    } else {
      localStorage.setItem("storedEndDate", "");
      setEndDate("");
    }
    setOnStartDate(false);
  };

  const disabledDays = [];
  const bookedDays = (day) => {
    const utcDay = new Date(day.toLocaleDateString("sv-SE"));
    const currentDate = format(addDays(utcDay, 1), "MMM-dd-yyyy");
    if (bookedDates.length) {
      for (let i = 0; i < bookedDates.length; i++) {
        let formattedStartDate = format(bookedDates[i].startDate, "MMM-dd-yyyy");
        let formattedEndDate = format(bookedDates[i].endDate, "MMM-dd-yyyy");
        if (
          getTime(new Date(currentDate)) >= getTime(new Date(formattedStartDate)) &&
          getTime(new Date(currentDate)) <= getTime(new Date(formattedEndDate))
        ) {
          disabledDays.push(new Date(currentDate));
          return true;
        }
      }
    }
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
            minDate={new Date()} // if less than minDate those days are disables
            showDateDisplay={false} // hides the default start date - end date display
            focusedRange={onStartDate ? [0, 0] : [0, 1]} // [0,0] focuses the start date && [0,1] focuses the end date
            disabledDay={bookedDays} // pushed the days that should be disabled into an array
            disabledDates={disabledDays} // takes the disables days array and disables the days
            ranges={booking} // ** collects the start date and end date values **
            onRangeFocusChange={setFocusedRange}
            onChange={handleSelect} // handles on change after every date is selected
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            direction="horizontal" // direction the months flow
            shownDate={shownDateChangeValue} /*** set the current month ***/
            showMonthAndYearPickers={false} // hides the dropdown option for months
            fixedHeight={true} // keeps the calender a consistent height
            preventSnapRefocus={true} // keeps the calendar from rendering when you select a date in the 2nd month
            onShownDateChange={(month) => {
              // checks if user clicked next or previous month, this is used to trigger transitions
              const isNext = isAfter(month, shownDateChangeValue);
              setIsNextMonth(isNext ? true : false);
              setShownDateChangeValue(month);
            }}
          />
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Dates;
