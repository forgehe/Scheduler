import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  return (
    <ul>
      {days.map(value => (
        <DayListItem
          key={value.id}
          name={value.name}
          spots={value.spots}
          selected={day === value.name}
          setDay={setDay}
        />
      ))}
    </ul>
  );
}
