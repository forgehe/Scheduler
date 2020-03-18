import React from "react";
import DayListItem from "./DayListItem";

// const days = [
//   { id: 1, name: "Monday", spots: 2 },
//   { id: 2, name: "Tuesday", spots: 5 },
//   { id: 3, name: "Wednesday", spots: 0 }
// ];

export default function DayList(props) {
  const { days, day, setDay } = props;
  return (
    <ul>
      {days.map(value => (
        <DayListItem
          name={value.name}
          spots={value.spots}
          selected={day === value.name}
          setDay={setDay}
        />
      ))}
    </ul>
  );
}
