import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel } = props;
  const [value, onChange] = useState(interviewer);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={name ? name : ""}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => onChange(event)}
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={value}
          onChange={onChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
