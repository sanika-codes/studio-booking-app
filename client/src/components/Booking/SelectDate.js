import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import FullDayBooking from "./FullDayBooking";



const SelectDate = (props) => {

   

    const dateChangeHandler = (evt) => {
       
       props.onDateChange(evt);
    };

  return (
    <>
    <label htmlFor="selectDate">Choose a date</label>
    <Calendar id="selectDate" minDate={new Date()} value={props.date} onChange={dateChangeHandler} />
    {
        props.plan === "oneday" ? 
        <FullDayBooking date={props.date}/>
        : ''
    }
    </>
  );
};

export default SelectDate;
