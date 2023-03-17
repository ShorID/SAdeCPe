import React, { useState } from "react";
import PropTypes from "prop-types";
import Clickable from "../Clickable";
import Icon from "../Icon";
import { Collapse as RSCollapse } from "reactstrap";
import classNames from "classnames";

const Collapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <>
      {!props.manual && (
        <Clickable
          onClick={toggle}
          className={classNames("d-flex align-items-center", props.className)}
        >
          {props.header}
          <Icon name={isOpen ? "faAngleUp" : "faAngleDown"} />
        </Clickable>
      )}
      <RSCollapse
        isOpen={isOpen || props.isOpen}
        onEntering={props.onEntering}
        onEntered={props.onEntered}
        onExiting={props.onExiting}
        onExited={props.onExited}
      >
        {props.children}
      </RSCollapse>
    </>
  );
};

Collapse.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  className: PropTypes.string,
  manual: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default Collapse;
