import React, { useState } from "react";
import StepsPanel from "./StepsPanel";

const Payment = (props) => {
    return (
        <div className="container c-row no-padding payment no-wrap">
      <StepsPanel />
        <div className={`container`}>
        <h2 className="heading-normal">Payment</h2>
        </div>
        </div>
    );
};

export default Payment;