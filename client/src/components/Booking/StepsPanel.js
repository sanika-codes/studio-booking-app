import React, { useState } from "react";

import classes from "./StepsPanel.module.css";

const StepsPanel = () => {
  return (
    <aside className={`container ${classes.sideMain} `}>
      <ol>
        <li>Enter personal details  </li>
        <hr />
        <li>Enter booking details </li>
        <hr />
        <li>Terms and Conditions  </li>
        <hr />
        <li>Payment</li>
      </ol>
    </aside>
  );
};

export default StepsPanel;
