
import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("props:", props)
  // console.log("propsInt:", props.interviewers);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
  }

  function deleteI() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
  }

  console.log("student:", props.interview);
  console.log("interviewer:", props.interview)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />)}
      {mode === SAVING && (
        <Status
          message={"SAVING"}
        />)}
      {mode === DELETING && (
        <Status
          message={"DELETING"}
        />)}
        {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={() => back()}
          onConfirm={deleteI}
        />)}
        {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
    </article>
  )

}



