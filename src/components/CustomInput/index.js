import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label } from "reactstrap";

const CustomInput = (props) => {
  const { id, label, type = "text", variant = "form" } = props;
  if (variant === "group")
    return (
      <InputGroup>
        <InputGroupText>{label}</InputGroupText>
        <Input placeholder={props.placeholder} type={type} />
      </InputGroup>
    );
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input type={type} />
      <FormFeedback valid>Sweet! that name is available</FormFeedback>
      <FormText>Example help text that remains unchanged.</FormText>
    </FormGroup>
  );
};

CustomInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
};

export default CustomInput;
