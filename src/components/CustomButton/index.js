import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import classNames from "classnames";

const CustomButton = (props) => {
  return (
    <Button
      className={classNames("CustomButton", props.variant,props.className)}
      onClick={props.onClick}
      
    >
      {props.text || props.children}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default CustomButton;
