import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import classNames from "classnames";
import Text from "../Text";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const getMaxLetters = (name) => {
  switch (name) {
    case "name":
      return 50;
    case "lastName":
      return 100;
    case "description":
    case "comment":
      return 200;
    case "color":
      return 20;
    case "identification":
      return 16;
    case "address":
      return 200;
    default:
      return null;
  }
}

const CustomInput = (props) => {
  const {
    id,
    label,
    type = "text",
    variant = "form",
    tooltip,
    feedback,
    hint,
    size,
    role,
    disabled,
    value,
    onChange,
    name,
    required,
    Drawer,
    accept,
    refreshFunc = () => { },
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const maxLength = getMaxLetters(name);
  const openCreateModal = () => setIsOpen((prev) => !prev);

  const input = (
    <Input
      placeholder={props.placeholder}
      type={type}
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
      accept={accept}
      maxLength={maxLength}
    >
      {props.type === "select" ? props.children : undefined}
    </Input>
  );

  const labelText = (
    <>
      <Text size={size}>{label}</Text>
      {Drawer && (
        <Tooltip tooltip="No encuentras lo que buscas? Crealo!" TagName="span">
          <Button
            size="sm"
            color="success"
            className="CustomInput-createBtn"
            type="button"
            onClick={openCreateModal}
          >
            <Icon name="faPlus" />
          </Button>
        </Tooltip>
      )}
    </>
  );

  const fullInput =
    variant === "group" ? (
      <InputGroup className={props.wrapperClass}>
        {label && (
          <InputGroupText className={props.labelClass}>
            {labelText}
          </InputGroupText>
        )}
        {input}
        {props.type !== "select" && props.children}
      </InputGroup>
    ) : (
      <FormGroup switch={type === "switch"} className={props.wrapperClass}>
        {label && (
          <Label for={id} className={props.labelClass}>
            {labelText}
          </Label>
        )}
        {input}
        {props.type !== "select" && props.children}
        {maxLength && typeof value === "string" && <FormText style={{ position: "absolute", right: "16px" }} ><span style={(maxLength <= (value || "").length ? { color: "red" } : {})}>{`${(value || "").length}/${maxLength}`}</span></FormText>}
        {feedback && <FormFeedback valid>{feedback}</FormFeedback>}
        {hint && <FormText>{hint}</FormText>}
      </FormGroup>
    );

  const withTooltip = tooltip ? (
    <Tooltip tooltip={tooltip}>{fullInput}</Tooltip>
  ) : (
    fullInput
  );

  return (
    <React.Fragment>
      {withTooltip}
      {Drawer && isOpen && (
        <Drawer
          isOpen
          toggle={openCreateModal}
          isCreating
          refresh={refreshFunc}
        />
      )}
    </React.Fragment>
  );
};

CustomInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  feedback: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.any,
  size: PropTypes.string,
  tooltip: PropTypes.string,
  Drawer: PropTypes.any,
  wrapperClass: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
  role: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
  refreshFunc: PropTypes.func,
};

export default CustomInput;
