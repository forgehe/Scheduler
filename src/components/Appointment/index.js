import React, { Fragment } from "react";

import "./styles.scss";
import Header from "./Header";
import Confirm from "./Confirm";
import Show from "./Show";
import Status from "./Status";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";

export default function Application(props) {
  const { interview, id, time } = props;
  return (
    <>
      <Header time={time}></Header>
      {interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        ></Show>
      ) : (
        <Empty onAdd={() => console.log("neat")}></Empty>
      )}
    </>
  );
}
