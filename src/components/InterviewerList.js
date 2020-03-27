import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(element => (
          <InterviewerListItem
            key={element.id}
            id={element.id}
            name={element.name}
            avatar={element.avatar}
            selected={value === element.id}
            onChange={event => onChange(element.id)}
          ></InterviewerListItem>
        ))}
      </ul>
    </section>
  );
}
