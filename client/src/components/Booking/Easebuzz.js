import React, { useState, useEffect } from "react";

const Easebuzz = (props) => {
  const [accessKey, setAccessKey] = useState("");

  const getUniqueTransactionId = (date) => {
    const timestamp = new Date(date).getTime();
    //Creating random number. Since it contains a decimal symbol (.), we convert it into string and remove it.We also only take 4 digits since tit is too long
    const randNum = Math.random().toString().replace(".", "").substring(0, 4);
    return `T_${timestamp}_${randNum}`;
  };
  useEffect(() => {
    async function initiatePayment() {
      if (props) {
         let bookingInfo = `Booking from ${new Date(
          props.data.userDetails.time[0]
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })} to ${new Date(props.data.userDetails.time[1]).toLocaleTimeString(
          "en-US",
          { hour: "2-digit", minute: "2-digit" }
        )} on ${props.data.userDetails.date}`;
        let paymentData = {
          txnid: getUniqueTransactionId(props.data.userDetails.date),
          amount: parseFloat(props.total).toFixed(2),
          name: props.data.userDetails.name,
          email: props.data.userDetails.email,
          phone: props.data.userDetails.phone,
          productinfo:
            props.data.plan +
            bookingInfo
              .replaceAll(":", "-")
              .replaceAll("+", "-")
              .replaceAll("(", " ")
              .replaceAll(")", " ")
              .trim(), //removing : () and +
          surl: "https://vibinicreates.com/response",
          furl: "https://vibinicreates.com/response",
          udf1: "",
          udf2: "",
          udf3: "",
          udf4: "",
          udf5: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
          sub_merchant_id: "",
          unique_id: "",
          split_payments: "",
          customer_authentication_id: "",
          udf6: "",
          udf7: "",
          udf8: "",
          udf9: "",
          udf10: "",
        };
        let eventData = {
          summary: `Event booked by ${props.data.userDetails.name}`,
          location: "Vibini Creates Studio, Aundh",
         
          start: {
            dateTime: new Date(props.data.userDetails.time[0]).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(props.data.userDetails.time[1]).toISOString(),
            timeZone: "Asia/Kolkata",
          }
        };
        let data = {
          paymentData : paymentData,
          eventData : eventData
        }
        
        try {
          let response = await fetch("/initiate_easebuzz_payment/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            redirect: "follow",
          });
          if (response.ok) {
            let result = await response.json();
            setAccessKey(result.access_key);
          }
        } catch (error) {
          console.log("Error: " + error);
        }

        return "";
      }
    }
    initiatePayment();
  }, []);

  return (
    <>
      <button className="extra-margin hover-effect" id="checkoutButton">
        <a href={`https://pay.easebuzz.in/pay/${accessKey}/`}>
          Proceed to Checkout
        </a>
      </button>
    </>
  );
};

export default Easebuzz;
