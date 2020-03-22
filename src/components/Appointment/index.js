import React, { Fragment, useEffect, useState } from "react";

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
  const {
    interview,
    id,
    time,
    interviewers,
    bookInterview,
    cancelInterview
  } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";
  const EDIT = "EDIT";

  const [confirmArgs, setConfirmArgs] = useState({
    message: "default confirmation",
    callback: null
  });

  const [statusArgs, setStatusArgs] = useState("default status");

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    console.log("save", interviewer);

    const interview = {
      student: name,
      interviewer
    };
    status("Saving");
    axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => bookInterview(id, interview))
      .then(() => transition(SHOW));
  }
  function deleteAppointment(id) {
    status("Deleting");
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => cancelInterview(id))
      .then(() => transition(EMPTY));
  }

  function confirm(callback, message) {
    transition(CONFIRM);

    setConfirmArgs({
      callback,
      message
    });
  }
  console.log("confirmArgs", confirmArgs);

  function status(message) {
    transition(STATUS);
    setStatusArgs(message);
  }
  return (
    <>
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(EDIT)} />}
      {/* {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />} */}
      {mode === STATUS && <Status message={statusArgs} />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={confirmArgs.callback}
          message={confirmArgs.message}
        />
      )}
      {/* {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )} */}
      {mode === EDIT && (
        <Form
          name={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interview.interviewer.id : null}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() =>
            confirm(() => deleteAppointment(id), "Delete This Appointment?")
          }
          onEdit={() => transition(EDIT)}
        />
      )}
    </>
  );
}
