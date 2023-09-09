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
            <h5>Contactanos!</h5>
            <a href="mailto:shojiurid@gmail.com" className="Link">
              Shoji Uri Delgado
            </a>
            <a href="mailto:mikegarcia2397@gmail.com" className="Link">
              Michael Alejandro Garcia Romero
            </a>
          </Col>
          <Col md="4" className="Footer-links">
            <h5>Menu</h5>
            <Link to="/">Inicio</Link>
            <Link to="/admin">Administracion</Link>
            <Link to="/mis-datos">Solicitar informacion</Link>
            <Link></Link>
          </Col>
        </Row>
        <p style={{ color: "white" }} className="mt-4">
          © 2023 Creado por Shoji Delgado y Michael Garcia. Todos los derechos
          reservados.
        </p>
      </Container>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
