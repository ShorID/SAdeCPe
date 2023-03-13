import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "reactstrap";

const CustomAccordion = (props) => {
  const [open, setOpen] = React.useState();
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <Accordion open={open} toggle={toggle} className={props.className}>
      {props.children}
    </Accordion>
  );
};

CustomAccordion.propTypes = {
  className: PropTypes.string,
};

export default CustomAccordion;
