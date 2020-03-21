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

export default function Appointment(props) {
  const { interview, id, time } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log("mode", mode);
  // console.log("transition", transition);
  // console.log("back", back);

  return (
    <>
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onSave={() => console.log("save")}
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
