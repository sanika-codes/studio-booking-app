import React, { useState, useEffect } from "react";

import styles from "./SelectPlan.module.css";
import StepsPanel from "./StepsPanel";
import MonthlyBooking from "./MonthlyBooking";

import SelectHours from "./SelectHours";
import SelectDate from "./SelectDate";
import moment from "moment";

const SelectPlan = (props) => {
  const [selectedPlanValue, setSelectedPlanValue] = useState(props.plan);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
  const [message, setMessage] = useState("");
  const [messageDivClass, setMessageDivClass] = useState("");

  const planSelectHandler = (evt) => {
    if (evt.target.value === "hourly") setSelectedPlanValue("hourly");
    else if (evt.target.value === "oneday") setSelectedPlanValue("oneday");
    else setSelectedPlanValue("monthly");
  };

  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  };

  const dateRangeChangeHandler = (dateRange) => {
    setSelectedDateRange([dateRange[0], dateRange[1]]);
    setMessage(
      "You have selected " +
        moment(dateRange[0]).format("MMMM Do YYYY") +
        " to " +
        moment(dateRange[1]).format("MMMM Do YYYY")
    );
  };

  const slotsClickHandler = (time) => {
    if (time[0] !== -1) {
      //  let fromTimeHour = parseInt(time[0].substr(0,1));
      //  let toTimeHour = parseInt(time[1].substr(0,1));
      props.userDetails.time = [
        new Date(selectedDate).setHours(time[0], 0),
        new Date(selectedDate).setHours(time[1], 0),
      ];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlanValue === "monthly") {
      let enquiryData = {
        name: props.userDetails.name,
        email: props.userDetails.email,
        phone: props.userDetails.phone,
        dates: [
          moment(selectedDateRange[0]).format("MMMM Do YYYY"),
          moment(selectedDateRange[1]).format("MMMM Do YYYY"),
        ],
      };

      let response = await fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });
    //  setMessage(JSON.stringify(response));
      let result = await response.json();
      if(result.status === 'OK'){
        setMessage(
          "Thank you. We have received your enquiry and we will get in touch with you within 1 business day.)"
        ); 
        setSelectedDateRange(["", ""]);
        setMessageDivClass("thank-you");
      }
      else{
        setMessage("There was some problem with sending your enquiry. Kindly call us at 84215 44499 to get in touch.");
        setSelectedDateRange(["", ""]);
        setMessageDivClass("error");
      }
console.log(result);
      
    } else if (selectedPlanValue === "oneday") {
      props.userDetails.date = selectedDate;
      props.userDetails.time = [
        new Date(selectedDate).setHours(6, 0),
        new Date(selectedDate).setHours(20, 0),
      ];
      props.onClickProceed();
    } else if (selectedPlanValue === "hourly") {
      props.userDetails.date = selectedDate;
      props.onClickProceed();
    }
  };

  return (
    <div className="container c-row no-padding select-plan no-wrap">
      <StepsPanel />
      <div className={`container ${styles.formDiv} `}>
        <h2 className="heading-normal">Enter booking details</h2>
        <form
          action="#"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label htmlFor="selectPlan">Select Plan</label>
          <select
            id="selectPlan"
            defaultValue={selectedPlanValue}
            onChange={planSelectHandler}
          >
            <option value="hourly">Hourly</option>
            <option value="oneday">Full day ( 9 hours )</option>
            <option value="monthly">Monthly</option>
          </select>

          {selectedPlanValue === "hourly" ? (
            <>
              <SelectDate
                onDateChange={dateChangeHandler}
                date={selectedDate}
                plan={selectedPlanValue}
              />
              <SelectHours
                date={moment(selectedDate)}
                onSlotClick={slotsClickHandler}
              />
            </>
          ) : selectedPlanValue === "monthly" ? (
            <>
              <MonthlyBooking
                userDetails={props.userDetails}
                onDateRangeSelect={dateRangeChangeHandler}
              />
              {message.length > 0 ? (
                <div
                  id={styles.selections}
                  className={messageDivClass !== "" ? styles[messageDivClass] : ""}
                >
                  <h3>{message}</h3>
                </div>
              ) : (
                <></>
              )}

              <button type="submit" className="hover-effect">
                Send Enquiry
              </button>
            </>
          ) : (
            <>
              <SelectDate
                onDateChange={dateChangeHandler}
                date={selectedDate}
                plan={selectedPlanValue}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SelectPlan;
