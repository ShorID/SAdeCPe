import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import Link from "../Link";

const Footer = (props) => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col md="4" className="Footer-links">
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
          </Col>
          <Col md="4" className="Footer-links">
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
            <Link>Lorem ipsum dolor sit amet</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
