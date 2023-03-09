import React from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import Icon from "../Icon";
import Clickable from "../Clickable";

const CustomCheck = (props) => {
  const { id, label, variant = "form" } = props;
  const [isChecked, setIsChecked] = React.useState(props.checked);

  const handleCheck = () => setIsChecked((prev) => !prev);

  if (variant === "group")
    return (
      <InputGroup>
        {label && <InputGroupText>{label}</InputGroupText>}
        <Clickable onClick={handleCheck}>
          <img className="CustomCheck" alt="select item" src={isChecked? "checkboxFilled.svg" : "checkboxEmpty.svg"} />
          {/* <Icon
            name={isChecked ? "faSquareCheck" : "faSquare"}
            className="CustomCheck"
          /> */}
        </Clickable>
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
      <Clickable onClick={handleCheck}>
        {/* <Icon
          name={isChecked ? "faSquareCheck" : "faSquare"}
          className="CustomCheck"
        /> */}
        <img className="CustomCheck" alt="select item" src={isChecked? "checkboxFilled.svg" : "checkboxEmpty.svg"} />
      </Clickable>
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
