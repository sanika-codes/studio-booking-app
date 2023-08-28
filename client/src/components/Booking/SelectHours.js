import React, { useState, useEffect } from "react";
import styles from "./SelectHours.module.css";
import moment from "moment";

const SelectHours = (props) => {
  const timeSlotsInitialState = [
    {
      label: "6am - 7am",
      fromLabel: "6am",
      toLabel: "7am",
      value: 6,
      disabled: false,
      selected: "false",
      arrIndex: 0,
    },
    {
      label: "7am - 8am",
      fromLabel: "7am",
      toLabel: "8am",
      value: 7,
      disabled: false,
      selected: "false",
      arrIndex: 1,
    },
    {
      label: "8am - 9am",
      fromLabel: "8am",
      toLabel: "9am",
      value: 8,
      disabled: false,
      selected: "false",
      arrIndex: 2,
    },
    {
      label: "9am - 10am",
      fromLabel: "9am",
      toLabel: "10am",
      value: 9,
      disabled: false,
      selected: "false",
      arrIndex: 3,
    },
    {
      label: "10am - 11am",
      fromLabel: "10am",
      toLabel: "11am",
      value: 10,
      disabled: false,
      selected: "false",
      arrIndex: 4,
    },
    {
      label: "11am - 12 am",
      fromLabel: "11am",
      toLabel: "12am",
      value: 11,
      disabled: false,
      selected: "false",
      arrIndex: 5,
    },
    {
      label: "12pm - 1pm",
      value: 12,
      fromLabel: "12pm",
      toLabel: "1pm",
      disabled: false,
      selected: "false",
      arrIndex: 6,
    },
    {
      label: "1pm - 2pm",
      value: 13,
      fromLabel: "1pm",
      toLabel: "2pm",
      disabled: false,
      selected: "false",
      arrIndex: 7,
    },
    {
      label: "2pm - 3pm",
      value: 14,
      fromLabel: "2pm",
      toLabel: "3pm",
      disabled: false,
      selected: "false",
      arrIndex: 8,
    },
    {
      label: "3pm - 4pm",
      value: 15,
      fromLabel: "3pm",
      toLabel: "4pm",
      disabled: false,
      selected: "false",
      arrIndex: 9,
    },
    {
      label: "4pm - 5pm",
      value: 16,
      fromLabel: "4pm",
      toLabel: "5pm",
      disabled: false,
      selected: "false",
      arrIndex: 10,
    },
    {
      label: "5pm - 6pm",
      value: 17,
      fromLabel: "5pm",
      toLabel: "6pm",
      disabled: false,
      selected: "false",
      arrIndex: 11,
    },
    {
      label: "6pm - 7pm",
      value: 18,
      fromLabel: "6pm",
      toLabel: "7pm",
      disabled: false,
      selected: "false",
      arrIndex: 12,
    },
    {
      label: "7pm - 8pm",
      value: 19,
      fromLabel: "7pm",
      toLabel: "8pm",
      disabled: false,
      selected: "false",
      arrIndex: 13,
    },
  ];
  const timeSlotsInitialDisabledState = [
    {
      label: "6am - 7am",
      fromLabel: "6am",
      toLabel: "7am",
      value: 6,
      disabled: true,
      selected: "false",
      arrIndex: 0,
    },
    {
      label: "7am - 8am",
      value: 7,
      fromLabel: "7am",
      toLabel: "8am",
      disabled: true,
      selected: "false",
      arrIndex: 1,
    },
    {
      label: "8am - 9am",
      value: 8,
      fromLabel: "8am",
      toLabel: "9am",
      disabled: true,
      selected: "false",
      arrIndex: 2,
    },
    {
      label: "9am - 10am",
      value: 9,
      fromLabel: "9am",
      toLabel: "10am",
      disabled: true,
      selected: "false",
      arrIndex: 3,
    },
    {
      label: "10am - 11am",
      value: 10,
      fromLabel: "10am",
      toLabel: "11am",
      disabled: true,
      selected: "false",
      arrIndex: 4,
    },
    {
      label: "11am - 12pm",
      value: 11,
      fromLabel: "11am",
      toLabel: "12pm",
      disabled: true,
      selected: "false",
      arrIndex: 5,
    },
    {
      label: "12pm - 1pm",
      value: 12,
      fromLabel: "12pm",
      toLabel: "1pm",
      disabled: true,
      selected: "false",
      arrIndex: 6,
    },
    {
      label: "1pm - 2pm",
      value: 13,
      fromLabel: "1pm",
      toLabel: "2pm",
      disabled: true,
      selected: "false",
      arrIndex: 7,
    },
    {
      label: "2pm - 3pm",
      value: 14,
      fromLabel: "2pm",
      toLabel: "3pm",
      disabled: true,
      selected: "false",
      arrIndex: 8,
    },
    {
      label: "3pm - 4pm",
      value: 15,
      fromLabel: "3pm",
      toLabel: "4pm",
      disabled: true,
      selected: "false",
      arrIndex: 9,
    },
    {
      label: "4pm - 5pm",
      value: 16,
      fromLabel: "4pm",
      toLabel: "5pm",
      disabled: true,
      selected: "false",
      arrIndex: 10,
    },
    {
      label: "5pm - 6pm",
      value: 17,
      fromLabel: "5pm",
      toLabel: "6pm",
      disabled: true,
      selected: "false",
      arrIndex: 11,
    },
    {
      label: "6pm - 7pm",
      value: 18,
      fromLabel: "6pm",
      toLabel: "7pm",
      disabled: true,
      selected: "false",
      arrIndex: 12,
    },
    {
      label: "7pm - 8pm",
      value: 19,
      fromLabel: "7pm",
      toLabel: "8pm",
      disabled: true,
      selected: "false",
      arrIndex: 13,
    },
  ];

  const [timeSlots, setTimeSlots] = useState(timeSlotsInitialDisabledState);
  const [selectedTimeSlot1, setSelectedTimeSlot1] = useState("");
  const [selectedTimeSlot2, setSelectedTimeSlot2] = useState("");
  const [time, setTime] = useState([-1, -1]);

  useEffect(() => {
    if (!isNaN(props.date)) {
      let dateFrom = new Date(props.date);
      dateFrom.setHours(6, 0, 0);
      dateFrom = dateFrom.toISOString();
      let dateTo = new Date(props.date);
      dateTo.setHours(20, 0, 0);
      dateTo = dateTo.toISOString();

      const apiURL =
        "/api/freeBusyData/dateFrom/" + dateFrom + "/dateTo/" + dateTo;
      fetch(apiURL)
        .then((res) => res.json())
        .then(
          (data) => {
            //Data is received as an array if more than 1 busy events are found. If 1 event is found an object is returned.
            let from, to, toMinutes;
               console.log(data);
            if (data.busyData !== undefined) {
              data.busyData.forEach((element) => {
                from = new Date(element.start).getHours();
                to = new Date(element.end).getHours();
                toMinutes = new Date(element.end).getMinutes();
                if (toMinutes > 0) to = to + 1;
                  console.log("from :" + from + "to:" + to);

                let updatedSlots = timeSlotsInitialState;
                for (let i = from; i < to; i++) {
                  let index = timeSlots.findIndex((e) => e.value === i);
                  //  console.log("index is" + index);

                  updatedSlots[index].disabled = true;
                }
                
                setTimeSlots(updatedSlots);
                console.log(timeSlots);
                setSelectedTimeSlot1("");
                setSelectedTimeSlot2("");
                setTime([-1, -1]);
              });
            } else {
              //No busy slots found on this date
              setTimeSlots(timeSlotsInitialState);
              setSelectedTimeSlot1("");
              setSelectedTimeSlot2("");
              setTime([-1, -1]);
            }
          },
          function (error) {
            console.log("Error : " + error);
          }
        );
    }
  }, [props.date]);

  //Code that makes all slots between selected range marked as selected. Runs when second slot is selected.
  useEffect(() => {
    let from = timeSlots.findIndex((s) => s.label === selectedTimeSlot1);
    let to = timeSlots.findIndex((s) => s.label === selectedTimeSlot2);

    if (from > to) {
      //User has selected 'to' time first and then 'from' time. In this case we have to reverse the values
      let temp = from;
      from = to;
      to = temp;
    }
    let updatedSlots = timeSlots.map((slot) => {
      if (slot.arrIndex >= from && slot.arrIndex <= to) {
        return { ...slot, selected: "true" };
      }
      return slot;
    });
    setTimeSlots(updatedSlots);
    if (timeSlots[from] && timeSlots[to])
      setTime([timeSlots[from].fromLabel, timeSlots[to].toLabel]);
  }, [selectedTimeSlot2]);

  const checkRangeIsValid = (secondSlot) => {
    //checks whether user has selected a slot of upto 4 hours

    let from = timeSlots.findIndex((s) => s.label === selectedTimeSlot1);
    let to = timeSlots.findIndex((s) => s.arrIndex == secondSlot);
    if (from > to) {
      let temp = from;
      from = to;
      to = temp;
    }
    if (to - from > 3) return false;
    else return true;
  };

  const selectSlotHandler = (evt) => {
    evt.preventDefault();
    if (selectedTimeSlot1 === "" || selectedTimeSlot2 === "") {
      if (selectedTimeSlot1 === "") {
        setSelectedTimeSlot1(evt.target.name);
        let updatedSlots = timeSlots.map((slot) => {
          if (slot.arrIndex == evt.target.getAttribute("arrindex")) {
            return { ...slot, selected: "true" };
          }
          return slot;
        });
        setTimeSlots(updatedSlots);
        setTime([
          timeSlots[evt.target.getAttribute("arrindex")].fromLabel,
          timeSlots[evt.target.getAttribute("arrindex")].toLabel,
        ]);
      } else if (selectedTimeSlot2 === "") {
        if (checkRangeIsValid(evt.target.getAttribute("arrindex"))) {
          setSelectedTimeSlot2(evt.target.name);
          let updatedSlots = timeSlots.map((slot) => {
            if (slot.arrIndex == evt.target.getAttribute("arrindex")) {
              return { ...slot, selected: "true" };
            }
            return slot;
          });
          setTimeSlots(updatedSlots);
        }
      }
    }
  };

  const resetHandler = (evt) => {
    evt.preventDefault();
    let from = timeSlots.findIndex((s) => s.label === selectedTimeSlot1);
    let to = timeSlots.findIndex((s) => s.label === selectedTimeSlot2);

    if (from > to) {
      let temp = from;
      from = to;
      to = temp;
    }

    let updatedSlots = timeSlots.map((slot) => {
      if (slot.arrIndex >= from && slot.arrIndex <= to) {
        return { ...slot, selected: "false" };
      }
      return slot;
    });
    setTimeSlots(updatedSlots);
    setSelectedTimeSlot1("");
    setSelectedTimeSlot2("");
    setTime([-1, -1]);
  };

  return (
    <div>
      <label>Select time slot ( You may select a range of up to 4 hours)</label>
      <div id={styles.timeSlots}>
        <ul id={styles.timeSlotUl}>
          {props.date
            ? timeSlots.map((slot) => (
                <li key={slot.value} className={styles.timeSlotLi}>
                  <button
                    id={slot.value}
                    arrindex={slot.arrIndex}
                    name={slot.label}
                    className={styles.timeSlot}
                    disabled={slot.disabled}
                    selectedslot={slot.selected}
                    onClick={selectSlotHandler}
                  >
                    {slot.label}
                  </button>
                </li>
              ))
            : ""}
        </ul>
      </div>

      <button className={styles.reset} onClick={resetHandler}>
        RESET TIME-SLOTS
      </button>
      <div id={styles.selections}>
        <h3>You have selected : </h3>
        <p>
          Date :
          {props.date
            ? " " + moment(props.date).format("MMMM Do YYYY")
            : "No date selected"}
        </p>
        <p>
          Time slot : {time[0] === -1 ? "___" : time[0]} to{" "}
          {time[1] === -1 ? "___" : time[1]}
        </p>
      </div>
    </div>
  );
};

export default SelectHours;
