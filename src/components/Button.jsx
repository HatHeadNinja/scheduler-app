import React from "react";
import classnames from "classnames";
import "components/Button.scss";

// button classes and values
export default function Button(props) {
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });
  // button layout
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
};