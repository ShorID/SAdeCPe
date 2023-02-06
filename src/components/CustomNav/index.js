import React from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";

const CustomNav = (props) => {
  return (
    <div className="CustomNav">
      <Nav pills className={classNames("container", "CustomNav")}>
        <NavItem>
          <NavLink active href="#" className="CustomNav-link">
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="CustomNav-link">
            Capacitaciones
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="CustomNav-link">
            Organizaciones
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="CustomNav-link">
            Solicitar Capacitacion
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

CustomNav.propTypes = {};

export default CustomNav;
