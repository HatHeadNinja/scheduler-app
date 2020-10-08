import React from "react";
import "components/Appointment/styles.scss";
import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Error from "components/Appointment/Error";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // save interview
  function save(name, interviewer) {

    console.log('SOF index.js save props:' , props);
    
    // for spots remaining
    let create = null;
    mode === CREATE ? (create = true) : (create = false);

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    
    props.bookInterview(props.id, interview, create)
    .then(() => transition(SHOW))
    .catch(err => {
      transition(ERROR_SAVE, true)
    });
  }

  // cancel interview
  function remove(id) {

    transition(DELETING);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(err => {
      transition(ERROR_DELETE, true)
    })
  }

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty
          onAdd={() => transition("CREATE")} 
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interview={props.interview}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={() => back(EMPTY)} />
      )}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure?"
          onCancel={() => back(SHOW)}
          onConfirm={() => remove(props.id)}
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
          name={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not book appointment"
          onClose={() => transition(props.interview ? SHOW : EMPTY)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  )
}