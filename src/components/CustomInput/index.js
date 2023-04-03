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
    value,
    onChange,
    name,
    required,
  } = props;
  if (variant === "group")
    return (
      <InputGroup>
        {label && <InputGroupText>{label}</InputGroupText>}
        <Input
          placeholder={props.placeholder}
          type={type}
          bgSize={size}
          role={role}
          className={classNames(
            "CustomInput",
            props.children && props.type !== "select" && "d-none",
            props.className
          )}
          disabled={disabled}
          value={value}
          checked={value}
          style={props.style}
          onChange={onChange}
          name={name}
          required={required}
        >
          {props.type === "select" ? props.children : undefined}
        </Input>
        {props.type !== "select" && props.children}
      </InputGroup>
    );
  return (
    <FormGroup switch={type === "switch"}>
      {label && <Label for={id}>{label}</Label>}
      <Input
        type={type}
        bgSize={size}
        className={classNames(
          "CustomInput",
          props.children && props.type !== "select" && "d-none",
          props.className
        )}
        role={role}
        disabled={disabled}
        checked={value}
        value={value}
        onChange={onChange}
        style={props.style}
        name={name}
        required={required}
      >
        {props.type === "select" ? props.children : undefined}
      </Input>
      {props.type !== "select" && props.children}
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
  value: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
  role: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

export default CustomInput;
