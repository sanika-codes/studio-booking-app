const express = require("express");
require('dotenv').config();
const { google } = require("googleapis");
const router = express.Router();

const SCOPES = process.env.VIBINI_APP_SCOPES;
const GOOGLE_PRIVATE_KEY = process.env.VIBINI_APP_GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.VIBINI_APP_GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.VIBINI_APP_GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.VIBINI_APP_CALENDAR_ID;

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

router.get('/', (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
});
module.exports = router;