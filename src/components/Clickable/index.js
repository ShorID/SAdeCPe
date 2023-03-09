import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Clickable = React.forwardRef(function Clickable(props, ref) {
  return (
    <button
      ref={ref}
      className={classNames(
        "Clickable",
        props.disabled && "disabled",
        props.className
      )}
      type="button"
      onClick={props.onClick}
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
  onClick: PropTypes.function,
  onBlur: PropTypes.function,
};

export default Clickable;
