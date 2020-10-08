import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

// interview list item
export default function InterviewerListItem(props) {
  const interviewersClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  // interview list layout
  return (
    <li className={interviewersClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}