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
  const { id, label, variant = "form", noDepency = true } = props;
  const [isChecked, setIsChecked] = React.useState(props.checked);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  const handleCheck = () => {
    if (props.onChange) props.onChange(!isChecked);
    if (noDepency) setIsChecked((prev) => !prev);
  };

  const inputLabel =
    variant === "group"
      ? label && <InputGroupText>{label}</InputGroupText>
      : label && <Label for={id}>{label}</Label>;

  const inputIcon = (
    <>
      <Clickable
        onClick={!props.disabled ? handleCheck : undefined}
        style={{ opacity: props.disabled ? ".3" : "1" }}
        className={props.className}
      >
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
        onChange={() => {}}
        className="d-none"
        disabled={props.disabled}
      />
    </>
  );

  const withTooltip = props.tooltip ? (
    <Tooltip tooltip={isChecked ? "Deseleccionar?" : "Seleccionar?"}>
      {inputIcon}
    </Tooltip>
  ) : (
    inputIcon
  );

  const InputWrapper = variant === "group" ? InputGroup : FormGroup;

  const input = (
    <InputWrapper className={props.wrapperClass}>
      {withTooltip}
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
  tooltip: PropTypes.bool,
  noDepency: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CustomCheck;
