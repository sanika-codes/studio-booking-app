import React, { useState } from "react";

import Plans from "./Booking/Plans";
import PersonalInfo from "./Booking/PersonalInfo";
import SelectPlan from "./Booking/SelectPlan";
import TNC from "./Booking/TNC";
import Payment from "./Booking/Payment";

const HomeBookingSection = () => {
  const [bookingView, setBookingView] = useState("ShowPlans");
  const [plan, setPlan] = useState("");
  const total = 0;
  //In case of monthly plan, time will be blank. In case of oneday plan time will be 6am to 8pm. In case of oneday and hourly plan, date array will only have 1 value, 2nd value will be blank
  const [userDetails, setUserDetails] = useState({
    name: "hello",
    email: "",
    phone: "",
    dates: ["", ""],
    time: ["", ""],
  });
  const planClickHandler = (plan) => {
    setBookingView("PersonalInfo");
    setPlan(plan);
  };

  //Runs after user has entered personal details and clicked on proceed
  const proceedtoSelectPlanClickHandler = (userInfo) => {
    setUserDetails({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      dates: ["", ""],
      time: ["", ""],
    });
    setBookingView("SelectPlan");
  };

  const proceedToTNCClickHandler = () => {
    console.log(userDetails);
    setBookingView("TNC");
  };

  //Runs after user has clicked on proceed on TNC page
  const proceedToPaymentClickHandler = () => {
    setBookingView("Payment");
  };

  const getBookingView = () => {
    switch (bookingView) {
      case "PersonalInfo":
        return (
          <PersonalInfo onClickProceed={proceedtoSelectPlanClickHandler} />
        );
      case "SelectPlan":
        return (
          <SelectPlan
            plan={plan}
            userDetails={userDetails}
            onClickProceed={proceedToTNCClickHandler}
          />
        );
      case "TNC":
        return (
          <TNC
            plan={plan}
            userDetails={userDetails}
            onClickProceed={proceedToPaymentClickHandler}
          />
        );
      case "Payment":
        return <Payment userDetails={userDetails} plan={plan}/>;
      default:
        return <Plans onUserClickPlan={planClickHandler} />;
    }
  };
  return <div id="bookingSection">
    {getBookingView()}
  </div>
};

export default HomeBookingSection;
