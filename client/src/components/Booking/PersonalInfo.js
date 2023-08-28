import React, {useState} from "react";

import classes from "./PersonalInfo.module.css";
import StepsPanel from "./StepsPanel";

const PersonalInfo = (props) => {

  const [personalInfo, setPersonalInfo ] = useState({
    name : '',
    email : '',
    phone : ''
  });

  const inputNameChangeHandler = (evt) => {
    setPersonalInfo((prevState)=>{
      return {
        ...prevState,
        name : evt.target.value
      }
    });
  };

  const inputEmailChangeHandler = (evt) => {
    setPersonalInfo((prevState)=>{
      return {
        ...prevState,
        email : evt.target.value
      }
    });
  };

  const inputPhoneChangeHandler = (evt) => {
    setPersonalInfo((prevState)=>{
      return {
        ...prevState,
        phone : evt.target.value
      }
    });
  };
const submitClickHandler = (evt) => {
  evt.preventDefault();
  props.onClickProceed(personalInfo);
};

  
  return (
  <div className="container c-row no-padding personal-info no-wrap">
    <StepsPanel />
   <div className={`container ${classes.formDiv} `}>
    <h2 className="heading-normal">Enter personal details</h2>
    <form action="#" method="post" encType="multipart/form-data" onSubmit={submitClickHandler} >
    
    <div id="nameSection">
      <label htmlFor="Name">Name</label>
      <input type="text" id="name" placeholder="Jane Doe" required value={personalInfo.name} onChange={inputNameChangeHandler}/>
    </div>
    <div id="emailSection">
      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" placeholder="janedoe@gmail.com" required value={personalInfo.email} onChange={inputEmailChangeHandler}/>
    </div>
    <div id="phoneSection">
      <label htmlFor="phone">Phone Number</label>
      <input type="tel"  id="phone" placeholder="+91 123 456 7890" value={personalInfo.phone} onChange={inputPhoneChangeHandler}/>
    </div>
    <button type="submit" className="hover-effect" >Proceed</button>
  </form>

    </div>
    
  </div>
  );
};

export default PersonalInfo;
