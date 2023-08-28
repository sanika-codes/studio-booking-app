import React, { useState, useEffect } from "react";

const Event = (props) => {
  const [events, setEvents] = useState([]);
  
  useEffect(
    () => {
      fetch('/api/events').then(
        res => res.json()
        
      ).then(
        (events) => {
       //   console.log(events.events);
          setEvents(events);
        },
        function (error){
          console.log(error);
        }
      )
    },[]
  );

  const getEventsDiv = () => {
    if(events == undefined)
      return '';
    else if(events.events){
      
      if(events.events.length > 1){
        return (<ul>
          { 
            events.events.map( event => (
              <li key={event.id}>{event.summary}</li>
            
            )
            ) 
          }
         </ul>) 
      }
    }
  };
    return (
        <div className="container c-col">
        {getEventsDiv()}
        </div>
      );
};
export default Event;
  /*
  
        
         */