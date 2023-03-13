import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import classNames from "classnames";
import Text from "../Text";

const CustomButton = (props) => {
  return (
    <Button
      className={classNames(
        !props.withoutCustom && "CustomButton",
        props.variant,
        props.className
      )}
      color={props.btnColor}
      outline={props.btnOutline}
      size={props.btnSize}
      onClick={props.onClick}
    >
      <Text>{props.text || props.children}</Text>
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  btnColor: PropTypes.string,
  btnSize: PropTypes.oneOf(["sm","md","lg"]),
  btnOutline: PropTypes.bool,
  withoutCustom: PropTypes.bool,
};

export default CustomButton;
