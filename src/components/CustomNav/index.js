import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import Icon from "../Icon";
import { useRouter } from "next/router";
import Text from "../Text";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";

const CustomNav = (props) => {
  const router = useRouter();
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="CustomNav">
      <Nav pills className={classNames("container", "CustomNav")}>
        <NavItem>
          <NavLink
            active={router.pathname === "/"}
            href="/"
            className="CustomNav-link"
          >
            Inicio
          </NavLink>
        </NavItem>
        {isAuth && (
          <NavItem>
            <NavLink
              active={router.asPath.includes("/admin")}
              href="/admin"
              className="CustomNav-link"
            >
              Adminstracion
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink
            active={router.asPath.includes("/mis-datos")}
            href="/mis-datos"
            className="CustomNav-link"
          >
            Mi informacion
          </NavLink>
        </NavItem>
        {router.pathname !== "/login" && !isAuth && (
          <NavItem className="CustomNav-end">
            <NavLink href="/login" className="CustomNav-link">
              <Icon name="faArrowRightFromBracket" />{" "}
              <Text className="d-none d-md-inline" TagName="span">
                Acceder
              </Text>
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </div>
  );
};

CustomNav.propTypes = {};

export default CustomNav;
