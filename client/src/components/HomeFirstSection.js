import React from "react";

import classes from "./HomeFirstSection.module.css";

const HomeFirstSection = () => {
  return (
    <div className={`container c-col ${classes.homeFirst}`}>
      <div className={classes.overlay}>
        {" "}
        <p>.</p>
      </div>
      <p className={classes["big-heading"]}>
        Get ready to vibe, create, and soar to new heights with vibini{" "}
        <span>Creates</span> -{" "}
      </p>
      <p>where events unfold, slots get booked, and creativity takes flight</p>

      <button className="extra-margin hover-effect">
        <a href="/#bookingSection">Host an Event </a>
      </button>
    </div>
  );
};

export default HomeFirstSection;
