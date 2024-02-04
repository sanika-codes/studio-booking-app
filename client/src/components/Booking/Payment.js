import React, { useState } from "react";
import StepsPanel from "./StepsPanel";
import styles from "./Payment.module.css";
import userImg from "../Booking/assets/icons/user-g.svg";
import calImg from "../Booking/assets/icons/calendar.svg";
import clockImg from "../Booking/assets/icons/clock.svg";
import Easebuzz from "./Easebuzz";
import moment from "moment";

const Payment = (props) => {
  let total = 0;

  const getTotal = () => {
    if (props.plan === "oneday") {
      total = 1800;
      return total;
    } else if (props.plan === "hourly") {
      let timeDiifference =
        props.userDetails.time[1] - props.userDetails.time[0];
      //convert it into hours
      timeDiifference = timeDiifference / 1000 / 60 / 60;
      //900 is rate for one-hour
      total = 900 * timeDiifference;
      return total;
    }
  };
  return (
    <div className="container c-row no-padding payment no-wrap">
      <StepsPanel />
      <div className={`container ${styles["payment-div"]}`}>
        <div className={styles['payment-details']}>
          <h2 className="heading-normal">Payment</h2>
          <p className="text small-text">
            This is a secure 128-bit SSL encrypted payment.
          </p>
          <section className={styles.review}>
            <h3>Review booking</h3>
            <div id={styles["bookingDetails"]}>
              <div id="name">
                <img src={userImg} width="24px" />
                <p>{props.userDetails.name}</p>
              </div>

              <div id="date">
                <img src={calImg} width="24px" />
                <p>{moment(props.userDetails.date).format("MMMM Do YYYY")}</p>
              </div>

              <div id="time">
                <img src={clockImg} width="24px" />
                <p>
                  {new Date(props.userDetails.time[0]).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )}{" "}
                  -{" "}
                  {new Date(props.userDetails.time[1]).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>
            </div>

            <h3>Order summary</h3>
            <div id={styles.orderSummary}>
              <table>
                <tbody>
                  <tr>
                    <td>Total</td>
                    <td>Rs. {getTotal()}</td>
                  </tr>
                  <tr>
                    <td>Deposit (Refundable)</td>
                    <td>Rs. 3000</td>
                  </tr>
                  <tr>
                    <td>Sub- total</td>
                    <td>Rs. {getTotal() + 3000}</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <Easebuzz data={props} total={total}/>
      </div>
    </div>
  );
};

export default Payment;
