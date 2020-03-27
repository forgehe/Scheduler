import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected
  });
  const formatSpot = spots => {
    switch (spots) {
      case 0:
        return "no spots remaining";
      case 1:
        return "1 spot remaining";

      default:
        return `${spots} spots remaining`;
    }
  };
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpot(props.spots)}</h3>
    </li>
  );
}
