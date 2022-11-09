
import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVING";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.log("err", error)
        transition(ERROR_SAVE, true);
      })
  }

  function deleteI(event) {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log("err", error)
        transition(ERROR_DELETE, true);
      })
  }

  // function destroy(event) {
  //   transition(DELETING, true);
  //   props
  //    .cancelInterview(props.id)
  //    .then(() => transition(EMPTY))
  //    .catch(error => transition(ERROR_DELETE, true));
  //  }


  // console.log("interview:", props.interview)

  return (
    <article className="appointment" data-testid="appointment">
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
          message={"Saving"}
        />)}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
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
      {mode === ERROR_SAVE && (
        <Error
          message={"We ain't saving you fool!"}
          onClose={() => back()}
        />)}
      {mode === ERROR_DELETE && (
        <Error
          message={"Deleting does not compute!"}
          onClose={() => back()}
        />)}
    </article>
  )

}



