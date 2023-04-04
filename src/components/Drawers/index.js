import React from "react";
import PropTypes from "prop-types";
import { Form, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const Drawer = (props) => {
  const { form = {} } = props;
  return (
    <Offcanvas
      direction="end"
      toggle={props.toggle}
      isOpen={props.isOpen}
      className="Drawer"
    >
      <Form noValidate className="Drawer-form" {...form}>
        <OffcanvasHeader toggle={props.toggle}>{props.header}</OffcanvasHeader>
        <OffcanvasBody>{props.children}</OffcanvasBody>
        {props.footer && (
          <OffcanvasBody className="Drawer-footer">
            {props.footer}
          </OffcanvasBody>
        )}
      </Form>
    </Offcanvas>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  header: PropTypes.node,
  form: PropTypes.object.isRequired,
};

export default Drawer;
