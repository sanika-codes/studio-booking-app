import React, { useState } from "react";
import StepsPanel from "./StepsPanel";
import styles from "./TNC.module.css";

const TNC = (props) => {
  const [proceedButtonDisabled, setProceedButtonDisabled] = useState(true);
  const handleSubmit = (evt) => {
    evt.preventDefault();
   props.onClickProceed();
  };

  const checkboxClickHandler = (evt) => {
    if(evt.target.checked){
        setProceedButtonDisabled(false);
    }
    else{
        setProceedButtonDisabled(true);
    }
  };
  return (
    <div className="container c-row no-padding tnc no-wrap">
      <StepsPanel />
      <div className={`container ${styles["tnc-inner"]}`}>
        <h2 className="heading-normal">Terms & Conditions</h2>
        <ol className="small-text">
          <li>
            <h3>Acceptance of Terms : </h3>
            By accessing and using the Vibini Creates website ("the Site"), you
            agree to abide by these terms and conditions.
          </li>
          <li>
            <h3>Services Provided : </h3>
            Vibini Creates offers a platform for creators to host events and
            book slots. The website reserves the right to modify or discontinue
            any service, event, or slot without prior notice.
          </li>
          <li>
            <h3>User Responsibilities : </h3>
            You are responsible for maintaining the confidentiality of your
            account information. You agree to provide accurate and up-to-date
            information when registering for events or booking slots.
          </li>
          <li>
            <h3>Intellectual Property : </h3>
            All content and materials on the Site, including but not limited to
            text, graphics, logos, and images, are protected by copyright and
            other intellectual property laws. You may not reproduce, distribute,
            or modify any content without prior written consent from Vibini
            Creates.
          </li>
          <li>
            <h3>Intellectual Property : </h3>
            All content and materials on the Site, including but not limited to
            text, graphics, logos, and images, are protected by copyright and
            other intellectual property laws. You may not reproduce, distribute,
            or modify any content without prior written consent from Vibini
            Creates.
          </li>
          <li>
            <h3>Event Hosting and Slot Booking : </h3>
            Vibini Creates facilitates event hosting and slot booking but does
            not guarantee the availability or quality of events. The website is
            not responsible for any issues or disputes that may arise between
            event organizers and attendees.
          </li>
          <li>
            <h3>Limitation of Liability : </h3>
            Vibini Creates shall not be held liable for any direct, indirect,
            incidental, consequential, or special damages arising out of or in
            connection with the use of the Site or services provided.
          </li>
          <li>
            <h3>Privacy Policy : </h3>
            The privacy of your personal information is important to us. Please
            refer to our separate Privacy Policy for detailed information on how
            we collect, use, and protect your data.
          </li>
          <li>
            <h3>Governing Law : </h3>
            These terms and conditions shall be governed by and construed in
            accordance with the laws of [your jurisdiction]. Any disputes
            arising from the use of the Site shall be subject to the exclusive
            jurisdiction of the courts in [your jurisdiction].
          </li>
          <li>
            <h3>Modifications : </h3>
            Vibini Creates reserves the right to modify or update these terms
            and conditions at any time without prior notice. Continued use of
            the Site after any modifications constitutes acceptance of the
            updated terms.
          </li>
        </ol>
        <form
          action="#"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className={styles['agree-checkbox']}>
            <label htmlFor="agreeTNC">
            <input id="agreeTNC" type="checkbox" onChange={checkboxClickHandler}/>
              I have read and I agree to the terms and conditions.
              
            </label>
          </div>
          <button
            type="submit"
            className="hover-effect"
            disabled={proceedButtonDisabled}
            id={styles["proceed-button"]}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default TNC;
