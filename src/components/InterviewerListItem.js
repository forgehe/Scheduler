import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, onChange } = props;
  const interviewersListItemClasses = classNames({
    interviewers__item: true,
    "interviewers__item--selected": selected
  });
  return (
    <li className={interviewersListItemClasses} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected ? name : ""}
    </li>
  );
}
