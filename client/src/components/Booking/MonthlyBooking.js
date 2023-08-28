import React from "react";
import Calendar from "react-calendar";


const MonthlyBooking = (props) => {
  const dateChangeHandler = (value) => {
    props.onDateRangeSelect(value);
  };

  return (
    <>
      <label htmlFor="selectMonth">
        Please select your preferred from and to dates
      </label>
      <Calendar
        id="selectMonth"
        minDate={new Date()}
        selectRange
        onChange={dateChangeHandler}
      />
    </>
  );
};

export default MonthlyBooking;
