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
    refreshFunc = () => {},
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const openCreateModal = () => setIsOpen((prev) => !prev);

  const input = (
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
        {label && <InputGroupText>{labelText}</InputGroupText>}
        {input}
        {props.type !== "select" && props.children}
      </InputGroup>
    ) : (
      <FormGroup switch={type === "switch"} className={props.wrapperClass}>
        {label && <Label for={id}>{labelText}</Label>}
        {input}
        {props.type !== "select" && props.children}
        {feedback && <FormFeedback valid>{feedback}</FormFeedback>}
        {hint && <FormText>{hint}</FormText>}
      </FormGroup>
    );

  const withTooltip = tooltip? <Tooltip tooltip={tooltip}>{fullInput}</Tooltip> : fullInput

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
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  feedback: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.string,
  tooltip: PropTypes.string,
  Drawer: PropTypes.node,
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
