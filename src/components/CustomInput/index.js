import React from "react";
import PropTypes from "prop-types";
import {
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import classNames from "classnames";

const CustomInput = (props) => {
  const {
    id,
    label,
    type = "text",
    variant = "form",
    feedback,
    hint,
    size,
    role,
    disabled,
  } = props;
  if (variant === "group")
    return (
      <InputGroup>
        <InputGroupText>{label}</InputGroupText>
        <Input
          placeholder={props.placeholder}
          type={type}
          bgSize={size}
          role={role}
          className={classNames(props.children && "d-none", props.className)}
          disabled={disabled}
        />
        {props.children}
      </InputGroup>
    );
  return (
    <FormGroup switch={type === "switch"}>
      <Label for={id}>{label}</Label>
      <Input
        type={type}
        bgSize={size}
        className={classNames(props.children && "d-none", props.className)}
        role={role}
        disabled={disabled}
      />
      {props.children}
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
  role: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomInput;
