import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "reactstrap";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import { useRouter } from "next/router";

const CustomNavbar = (props) => {
  return (
    <Navbar className="CustomNavbar" container="lg">
      <NavbarBrand href="/" className="CustomNavbar-logo">
        <img
          alt="logo"
          src="/logo-fetesa-02.png"
          style={{
            height: 81,
            width: 165,
          }}
        />
      </NavbarBrand>
    </Navbar>
  );
};

CustomNavbar.propTypes = {};

export default CustomNavbar;
