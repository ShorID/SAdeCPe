import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const CustomNavbar = (props) => {
  return (
    <Navbar className="CustomNavbar" container="lg">
      <NavbarBrand href="/" className="CustomNavbar-logo">
        <img
          alt="logo"
          src="/LOGO FETESA.png"
          style={{
            height: 81,
          }}
        />
      </NavbarBrand>
    </Navbar>
  );
};

CustomNavbar.propTypes = {};

export default CustomNavbar;
