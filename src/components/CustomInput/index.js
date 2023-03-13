import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, FormText, Input, InputGroup, InputGroupText, Label } from "reactstrap";

const CustomInput = (props) => {
  const { id, label, type = "text", variant = "form", feedback, hint, size } = props;
  if (variant === "group")
    return (
      <InputGroup >
        <InputGroupText>{label}</InputGroupText>
        <Input placeholder={props.placeholder} type={type} bgSize={size} className={props.className} />
      </InputGroup>
    );
  return (
    <FormGroup >
      <Label for={id}>{label}</Label>
      <Input type={type} bgSize={size} className={props.className} />
      {feedback && <FormFeedback valid>{feedback}</FormFeedback>}
      {hint && <FormText>{hint}</FormText>}
    </FormGroup>
  );
};

CustomInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  feedback: PropTypes.string,
  hint: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
};

export default CustomInput;
