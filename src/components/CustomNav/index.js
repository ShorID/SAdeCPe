import React from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import Icon from "../Icon";
import { useRouter } from "next/router";
import fetcher from "@/services/fetcher";

const CustomNav = (props) => {
  const router = useRouter();
  return (
    <div className="CustomNav">
      <Nav pills className={classNames("container", "CustomNav")}>
        <NavItem>
          <NavLink active href="/" className="CustomNav-link">
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/mis-datos" className="CustomNav-link">
            Solicitar mi informacion
          </NavLink>
        </NavItem>
        {router.pathname !== "/login" &&
          !fetcher.defaults.headers["Authorization"] && (
            <NavItem className="CustomNav-end">
              <NavLink href="/login" className="CustomNav-link">
                <Icon name="faArrowRightFromBracket" /> Acceder
              </NavLink>
            </NavItem>
          )}
      </Nav>
    </div>
  );
};

CustomNav.propTypes = {};

export default CustomNav;
