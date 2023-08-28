import React from "react";

import classes from "./HomeFourthSection.module.css";

const HomeFourthSection = () => {
  return (
    <div className={`${classes.mainFourth} container c-row`}>
      <div className={`${classes['image-column']} container c-col`}>
        <div className={`${classes['image-box']} ${classes.dance}`}>
          <h4>DANCE, YOGA</h4>
        </div>
        <div className={`${classes['image-box']} ${classes.exhibitions}`}>
          <h4>EXHIBITIONS</h4>
        </div>
        <div className={`${classes['image-box']} ${classes.photoshoot}`}>
          <h4>PHOTOSHOOT</h4>
        </div>
      </div>
      <div className={`${classes['heading-column']} container`}>
      Curated activities for creative minds at Vibini Creates
      </div>
      <div className={`${classes['image-column']} container c-col`}>
        <div className={`${classes['image-box']} ${classes.activities}`}>
          <h4>ART & FUN ACTIVITIES</h4>
        </div>
        <div className={`${classes['image-box']} ${classes.pottery}`}>
          <h4>POTTERY</h4>
        </div>
        <div className={`${classes['image-box']} ${classes.workshops}`}>
          <h4>WORKSHOPS</h4>
        </div>
      </div>
    </div>
  );
};

export default HomeFourthSection;
