import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  let buttonClasses = classNames({
    button: true,
    "button--danger": props.danger,
    "button--confirm": props.confirm
  });
  console.log(buttonClasses, props);
  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
