import React from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

const CustomCheck = (props) => {
  const { id, label, variant = "form" } = props;
  const [isChecked, setIsChecked] = React.useState(props.checked);

  const handleChange = () => setIsChecked((prev) => !prev);

  if (variant === "group")
    return (
      <InputGroup>
        {label && <InputGroupText>{label}</InputGroupText>}
        <Input
          placeholder={props.placeholder}
          type="checkbox"
          checked={isChecked}
          className="d-none"
        />
      </InputGroup>
    );
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Icon />
      <Input type="checkbox" checked={isChecked} className="d-none" />
    </FormGroup>
  );
};

CustomCheck.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(["form", "group"]),
  checked: PropTypes.boolean,
};

export default CustomCheck;
