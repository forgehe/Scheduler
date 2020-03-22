import React, { Fragment, useEffect } from "react";

import "./styles.scss";
import Header from "./Header";
import Confirm from "./Confirm";
import Show from "./Show";
import Status from "./Status";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode";
import axios from "axios";

export default function Appointment(props) {
  const { interview, id, time, interviewers, bookInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    console.log("save", interviewer);

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => bookInterview(id, interview))
      .then(() => transition(SHOW));
  }

  return (
    <>
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </>
  );
}
