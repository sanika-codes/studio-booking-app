import React, { useState, useEffect } from "react";
import styles from './FullDayBooking.module.css';
import moment from 'moment';

const FullDayBooking = (props) => {

    const [message, setMessage] = useState(""); 
    const [proceedButtonDisabled, setProceedButtonDisabled] = useState(true);

    useEffect(() => {
        if (props.date && !isNaN(props.date)) {
            
          let dateFrom = new Date(props.date);
          dateFrom.setHours(6, 0, 0);
          dateFrom = dateFrom.toISOString();
          let dateTo = new Date(props.date);
          dateTo.setHours(20, 0, 0);
          dateTo = dateTo.toISOString();
    
          const apiURL =
            "/api/freeBusyData/dateFrom/" + dateFrom + "/dateTo/" + dateTo;
          fetch(apiURL)
            .then((res) => res.json())
            .then(
              (data) => {
               
                if (data.busyData !== undefined) {
                  //busy slots founds
                  setMessage("Sorry, this date is not available. Kindly select another date.");
                } else {
                  //No busy slots found on this date
                  setMessage("You have selected " + moment(props.date).format("MMMM Do YYYY"));
                  setProceedButtonDisabled(false);
                }
              },
              function (error) {
                console.log("Error : " + error);
              }
            );
        }
      }, [props.date]);
  return (
    <>
      {message.length > 0 ? ( <div id={styles.selections}>
     <h3>{message}</h3>
    </div>) : ''}
      <button type="submit" className="hover-effect" disabled={proceedButtonDisabled}>
      Proceed
    </button>
    </>
  );
};

export default FullDayBooking;
