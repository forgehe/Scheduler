/**
 * Our InterviewerListItem takes in the following props:

    id:number - the id of the interviewer
    name:string - the name of the interviewer
    avatar:url - a url to an image of the interviewer
    selected:boolean - to determine if an interview is selected or not
    onChange:function - sets the interviewer upon selection

    <li className="interviewers__item">
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  Sylvia Palmer
</li>

 */

import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, onChange } = props;
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
