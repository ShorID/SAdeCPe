import React from "react";
import PropTypes from "prop-types";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const Drawer = (props) => {
  return (
    <Offcanvas
      direction="end"
      toggle={props.toggle}
      isOpen={props.isOpen}
      className="Drawer"
    >
      <OffcanvasHeader toggle={props.toggle}>{props.header}</OffcanvasHeader>
      <OffcanvasBody>{props.children}</OffcanvasBody>
      {props.footer && (
        <OffcanvasBody className="Drawer-footer">{props.footer}</OffcanvasBody>
      )}
    </Offcanvas>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  header: PropTypes.node,
};

export default Drawer;
