import React, { useState } from "react";

import "./styles.scss";
import Header from "./Header";
import Confirm from "./Confirm";
import Show from "./Show";
import Status from "./Status";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const {
    interview,
    id,
    time,
    interviewers,
    bookInterview,
    cancelInterview
  } = props;

  // Modes to determine which view to show
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Args when calling the confirm view
  const [confirmArgs, setConfirmArgs] = useState({
    message: "default confirmation",
    callback: null
  });

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    bookInterview(id, interview) //axios.put to update api, then setState new db
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  function deleteAppointment(id) {
    transition(DELETE, true);

    cancelInterview(id) //axios.delete to update api, then setState new db
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  function confirm(callback, message) {
    transition(CONFIRM);
    setConfirmArgs({
      callback,
      message
    });
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Error Saving Stuff"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error Deleting Stuff"} onClose={() => back()} />
      )}
      {/* calls the confirm function for both SAVE and DELETE modes. */}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={confirmArgs.callback}
          message={confirmArgs.message}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
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
          student={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interview.interviewer : null}
          onDelete={() =>
            confirm(() => deleteAppointment(id), "Delete This Appointment?")
          }
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  );
}
