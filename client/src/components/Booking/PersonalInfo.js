import React, { useState } from "react";

import styles from "./PersonalInfo.module.css";
import StepsPanel from "./StepsPanel";

const PersonalInfo = (props) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const inputNameChangeHandler = (evt) => {
    setPersonalInfo((prevState) => {
      return {
        ...prevState,
        name: evt.target.value,
      };
    });
  };

  const inputEmailChangeHandler = (evt) => {
    setPersonalInfo((prevState) => {
      return {
        ...prevState,
        email: evt.target.value,
      };
    });
  };

  const inputPhoneChangeHandler = (evt) => {
    setPersonalInfo((prevState) => {
      return {
        ...prevState,
        phone: evt.target.value,
      };
    });
  };

  const validateInput = () => {
    const nameRegex = /^[A-Za-z.\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (personalInfo.name.match(nameRegex)) {
      if (personalInfo.phone.match(phoneRegex)) {
        if (personalInfo.email.match(emailRegex)) {
          //fields valid
          return true;
        } else {
          //email invalid
          setPersonalInfo((prevState) => {
            return {
              ...prevState,
              email: "",
            };
          });
          setMessage("Please enter valid e-mail address.");
          return false;
        }
      } else {
        //phone invalid
        setPersonalInfo((prevState) => {
          return {
            ...prevState,
            phone: "",
          };
        });
        setMessage(
          "Please enter 10 digit phone number without country code or + sign."
        );
        return false;
      }
    } else {
      //name not valid
      setPersonalInfo((prevState) => {
        return {
          ...prevState,
          name: "",
        };
      });
      setMessage("Please enter valid name with only alphabets and . symbol");
      return false;
    }
  };
  const submitClickHandler = (evt) => {
    evt.preventDefault();
    if (validateInput()) props.onClickProceed(personalInfo);
  };

  return (
    <div className="container c-row no-padding personal-info no-wrap-desktop">
      <StepsPanel />
      <div className={`container ${styles.formDiv} `}>
        <h2 className="heading-normal">Enter personal details</h2>
        <form
          action="#"
          method="post"
          encType="multipart/form-data"
          onSubmit={submitClickHandler}
        >
          <div id="nameSection">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Jane Doe"
              required
              value={personalInfo.name}
              onChange={inputNameChangeHandler}
            />
          </div>
          <div id="emailSection">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="janedoe@gmail.com"
              required
              value={personalInfo.email}
              onChange={inputEmailChangeHandler}
            />
          </div>
          <div id="phoneSection">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 123 456 7890"
              value={personalInfo.phone}
              onChange={inputPhoneChangeHandler}
            />
          </div>
          {message.length > 0 ? (
            <div id={styles.messageDiv}>
              <h3>{message}</h3>
            </div>
          ) : (
            ""
          )}
          <button type="submit" className="hover-effect">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
