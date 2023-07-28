import React from "react";
import { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import AdminOptions from "../Layout/AdminOptions";
import Clickable from "../Clickable";
import Icon from "../Icon";
import { Helmet } from "react-helmet";
import Image from "next/image";

const CustomNavbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => setShowMenu((prev) => !prev);
  return (
    <Navbar className="CustomNavbar" container="lg">
      <Helmet
        bodyAttributes={
          showMenu ? { style: "overflow: hidden; max-height: 100vh;" } : {}
        }
      />
      <NavbarBrand href="/" className="CustomNavbar-logo">
        <Image
          alt="logo"
          src="/LOGO FETESA.png"
          style={{
            height: 81,
          }}
        />
      </NavbarBrand>
      <Clickable
        onClick={toggle}
        className="CustomNavbar-toggle d-block d-md-none"
      >
        <Icon name={showMenu ? "faClose" : "faNavicon"} size="lg" />
      </Clickable>
      <Collapse isOpen={showMenu} className="CustomNavbar-toggleContent" navbar>
        <AdminOptions />
      </Collapse>
    </Navbar>
  );
};

CustomNavbar.propTypes = {};

export default CustomNavbar;
