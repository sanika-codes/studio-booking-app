const express = require("express");
require('dotenv').config();
const { google } = require("googleapis");



const SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_PROJECT_NUMBER = process.env.VIBINI_APP_GOOGLE_PROJECT_NUMBER;
const GOOGLE_PRIVATE_KEY = process.env.VIBINI_APP_GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.VIBINI_APP_GOOGLE_CLIENT_EMAIL;
const GOOGLE_CALENDAR_ID = process.env.VIBINI_APP_CALENDAR_ID;



const create_event = (eventData) => {


    const jwtClient = new google.auth.JWT(
        GOOGLE_CLIENT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY,
        SCOPES
      );
      
    
    
const auth = new google.auth.GoogleAuth({
    keyFile : './google_service_acc_creds.json',
    scopes : SCOPES
 } );
  
 const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

      auth.getClient().then(a=>{
        calendar.events.insert({
          auth:a,
          calendarId: GOOGLE_CALENDAR_ID,
          resource: eventData,
        }, function(err, event) {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
          }
          console.log('Event created: %s', event.data);
          
        });
      })


}

exports.create_event = create_event;