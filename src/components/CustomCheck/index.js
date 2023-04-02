import React from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";

const CustomCheck = (props) => {
  const { id, label, variant = "form" } = props;
  const [isChecked, setIsChecked] = React.useState(props.checked);

  const handleCheck = () => setIsChecked((prev) => !prev);

  const inputLabel =
    variant === "group"
      ? label && <InputGroupText>{label}</InputGroupText>
      : label && <Label for={id}>{label}</Label>;

  const inputIcon = (
    <Tooltip
      tooltip={
        isChecked ? "Deseleccionar?" : "Seleccionar?"
      }
    >
      <Clickable onClick={handleCheck} className={props.className}>
        <img
          className="CustomCheck"
          alt="select item"
          src={isChecked ? "/checkboxFilled.svg" : "/checkboxEmpty.svg"}
        />
      </Clickable>
      <Input
        placeholder={props.placeholder}
        type="checkbox"
        checked={isChecked}
        className="d-none"
      />
    </Tooltip>
  );

  const InputWrapper = variant === "group" ? InputGroup : FormGroup;

  const input = (
    <InputWrapper className={props.wrapperClass}>
      {inputIcon}
      {inputLabel}
    </InputWrapper>
  );

  return input;
};

CustomCheck.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
  checked: PropTypes.bool,
};

export default CustomCheck;
