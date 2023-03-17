import React from "react";
import PropTypes from "prop-types";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const Drawers = (props) => {
  return (
    <Offcanvas direction="end" toggle={props.toggle} isOpen={props.isOpen} className="w-50">
      <OffcanvasHeader toggle={props.toggle}>{props.header}</OffcanvasHeader>
      <OffcanvasBody>{props.children}</OffcanvasBody>
    </Offcanvas>
  );
};

Drawers.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  header: PropTypes.node,
};

export default Drawers;
