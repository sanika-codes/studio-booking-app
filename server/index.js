//index.js code for integrating Google Calendar
require("dotenv").config();
const express = require("express");

const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const sha512 = require("js-sha512");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const events = require("./routes/events");
const freeBusyData = require("./routes/freeBusyData");

let eventData = {};

app.use(
  cors({
    origin: ["http://localhost:3000", "https://pay.easebuzz.in"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.static(path.join('public')));

const paymentConfig = {
  key: process.env.EASEBUZZ_KEY,
  salt: process.env.EASEBUZZ_SALT,
  env: process.env.EASEBUZZ_ENV,
  enable_iframe: process.env.EASEBUZZ_IFRAME,
};

let contactEmail = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "vibini.creates@gmail.com",
    pass: process.env.SMTP_KEY,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("eMAIL SENDING ERROR " + error);
  } else {
    console.log("Ready to Send EMAIL");
  }
});

app.post("/send", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const dates = req.body.dates;

  const adminMail = {
    from: "website@vibinicreates.com",
    to: "vibini.creates@gmail.com",
    subject: "Monthly Booking Enquiry",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Interested in booking from ${dates[0]} to ${dates[1]} </p>
             `,
  };
  contactEmail.sendMail(adminMail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
      console.log(error);
    } else {
      res.json({ status: "OK" });
    }
  });
  const clientMail = {
    from: "website@vibinicreates.com",
    to: email,
    subject: "Vibini Creates - We have received your enquiry.",
    html: `<p>Thank you for your enquiry. We will get in touch with you soon.</p>`,
  };
  contactEmail.sendMail(clientMail, (error) => {
    if (error) {
      console.log(`Error in sending email to client : ${error}`);
    }
  });
});

//response
app.post("/response", function (req, res) {
  function checkReverseHash(response) {
    var hashstring =
      paymentConfig.salt +
      "|" +
      response.status +
      "|" +
      response.udf10 +
      "|" +
      response.udf9 +
      "|" +
      response.udf8 +
      "|" +
      response.udf7 +
      "|" +
      response.udf6 +
      "|" +
      response.udf5 +
      "|" +
      response.udf4 +
      "|" +
      response.udf3 +
      "|" +
      response.udf2 +
      "|" +
      response.udf1 +
      "|" +
      response.email +
      "|" +
      response.firstname +
      "|" +
      response.productinfo +
      "|" +
      response.amount +
      "|" +
      response.txnid +
      "|" +
      response.key;
    hash_key = sha512.sha512(hashstring);
    if (hash_key == req.body.hash) return true;
    else return false;
  }
  if (checkReverseHash(req.body)) {
    let status = req.body.status;
    if (status !== "success") {
      res.render("payment-failed");
    } else {
      //send email to admin and customer.
      const adminMail = {
        from: "website@vibinicreates.com",
        to: "sanikapatwardhan2@gmail.com",
        subject: `New Booking from ${userData.name}`,
        html: `<p>New Booking</p>
                <p>Name: ${userData.name}</p>
                 <p>Email: ${userData.name}</p>
                 <p>Phone: ${userData.phone}</p>
                 <p>${userData.productinfo} </p>
                 `,
      };
      contactEmail.sendMail(adminMail, (error) => {
        if (error) {
          res.json({ status: "ERROR" });
          console.log(error);
        } else {
          res.json({ status: "OK" });
        }
      });
      const clientMail = {
        from: "website@vibinicreates.com",
        to: userData.email,
        subject: "Vibini Creates - We have received your booking.",
        html: `<p>Thank you for your booking. </p>
        <h2> Booking details :</h2>
        <p>Name: ${userData.name}</p>
                 <p>Email: ${userData.name}</p>
                 <p>Phone: ${userData.phone}</p>
                 <p>${userData.productinfo} </p>`,
      };
      contactEmail.sendMail(clientMail, (error) => {
        if (error) {
          console.log(`Error in sending email to client : ${error}`);
        }
      });
      try {
        createEvent();
      } catch (e) {
        console.log("Error while creating event");
      }

      res.render("thank-you");
    }
  }
  res.send("false, check the hash value ");
});

const createEvent = () => {
  let createEvent = require("./create_event.js");
  createEvent.create_event(eventData);
};

//initiate_payment API
app.post("/initiate_easebuzz_payment/", function (req, res) {
  eventData = req.body.eventData;

  var initiate_payment = require("./Easebuzz/initiate_payment.js");
  initiate_payment.initiate_payment(req.body.paymentData, paymentConfig, res);
});

app.use("/api/events", events);
app.use("/api/freeBusyData", freeBusyData);

   app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));

});  

 app.get("/api", (req, res) => {
  res.send("Hello from server");
});
 
app.listen(3000, () => console.log(`App listening on port 3000!`));

