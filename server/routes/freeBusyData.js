const { google } = require("googleapis");
const express = require("express");

const GOOGLE_API_KEY = process.env.VIBINI_APP_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.VIBINI_APP_CALENDAR_ID;

const cal = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY,
});


const router2 = express.Router();

// Set beginning of query to 3 pm tomorrow
const tomorrow3pm = new Date();
tomorrow3pm.setDate(tomorrow3pm.getDate() + 1);
tomorrow3pm.setHours(6, 0, 0);

// Set end of query to 6 pm tomorrow
const tomorrow6pm = new Date();
tomorrow6pm.setDate(tomorrow6pm.getDate() + 1);
tomorrow6pm.setHours(20, 0, 0);


router2.get("/dateFrom/:dateFrom/dateTo/:dateTo", (req, res) => {
 // console.log(req.params.dateFrom + "   " + req.params.dateTo);
  cal.freebusy
    .query({
      resource: {
        timeMin: req.params.dateFrom,
        timeMax: req.params.dateTo,

        items: [{ id: GOOGLE_CALENDAR_ID }],
      },
      auth: GOOGLE_API_KEY,
    })
    .then((result) => {
      const busy = result.data.calendars[GOOGLE_CALENDAR_ID].busy;
      const errors = result.data.calendars[GOOGLE_CALENDAR_ID].errors;
      if (undefined !== errors) {
        console.error(
          "Check this this calendar has public free busy visibility"
        );
      } else if (busy.length !== 0) {
        res.send({busyData : busy});
      } else {
        res.send({ message: "The day is free" });
      }
    })
    .catch((e) => {
      console.error(e);
    });
});

module.exports = router2;
