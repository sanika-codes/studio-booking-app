import React, {useState} from "react";

import classes from "./Plans.module.css";

const Plans = (props) => {
 // const [step1Visible, setStep1Visible] = useState(false);

  const clickHandler = (evt) => {
    props.onUserClickPlan(evt.target.id);
  }
  
  return (
  <div className={`${classes['main-booking']} container c-row`}>
    <h2>Your plan, your choice</h2>
    <p className="text extra-margin five-margin-down">Unlock your creative potential with Vibini Creates</p>
    <div className={` container ${classes['booking-option']} ${classes.monthly}`}>
        <h3>Monthly subscription</h3>
        <h4>Rs. 6000 </h4><span>per month</span>
        <p className="extra-margin">Pay for an entire month and save Rs. 2000</p>
        <button className={classes.bookButton} onClick={clickHandler} id="monthly">SEND ENQUIRY</button>

    </div>
    <div className={` container ${classes['booking-option']} ${classes['one-day']}`}>
        <h3>One day subscription</h3>
        <h4>Rs. 1800 </h4><span>for 9 hours</span>
        <p>Pay for an entire month and save Rs. 2000</p>
        <button className={classes.bookButton} onClick={clickHandler} id="oneday">BOOK NOW</button>

    </div>
    <div className={` container ${classes['booking-option']} ${classes.hourly}`}>
        <h3>Hourly subscription</h3>
        <h4>Rs. 900 </h4><span>for a day</span>
        <p>Pay for an entire month and save Rs. 2000</p>
        <button className={classes.bookButton} onClick={clickHandler} id="hourly">BOOK NOW</button>

    </div>
    
  </div>
  );
};

export default Plans;
