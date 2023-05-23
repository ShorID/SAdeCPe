import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Clickable = React.forwardRef(function Clickable(props, ref) {
  return (
    <button
      ref={ref}
      id={props.id}
      className={classNames(
        "Clickable",
        props.disabled && "disabled",
        props.className
      )}
      type="button"
      onClick={props.onClick}
      onBlur={props.onBlur}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
});

Clickable.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Clickable;
