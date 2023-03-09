import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Clickable = React.forwardRef(function Clickable(props, ref) {
  return (
    <button
      ref={ref}
      className={classnames(
        "Clickable",
        props.disabled && "disabled",
        props.className
      )}
      type="button"
      onClick={props.disabled !== true ? props.clicked : undefined}
      onBlur={props.onBlur}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});

Clickable.propTypes = {
  disabled: PropTypes.boolean,
  className: PropTypes.string,
  clicked: PropTypes.function,
  onBlur: PropTypes.function,
};
