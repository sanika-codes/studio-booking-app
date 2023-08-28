import React from "react";

import classes from "./HomeSecondSection.module.css";
import vibiniCreatesLogo from "../assets/images/VibiniCreateslogo-black.png";
import twoLines from "../assets/images/2-lines.png";
import studioPhoto from '../assets/images/studio photo.png';
import orangeDonut from '../assets/images/orange donut.png';

const HomeSecondSection = () => {
  return (
    <div className={`container ${classes.mainSecond} `}>
      <div className={`container ${classes['left-section']} `}>
        <img
          src={vibiniCreatesLogo}
          alt="Vibini Creates"
          id="vibiniCreates"
        ></img>
        <img src={twoLines} alt=" " id="twoLines"></img>
        <img src={orangeDonut} alt=" " id="orangeDonut"></img>
        <p className="text double-extra-margin">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className={`${classes['right-section']} container`}>
      <img src={studioPhoto} alt="vibini Creates studio space " id="studioPhoto"></img>
      </div>
      
    </div>
  );
};

export default HomeSecondSection;
