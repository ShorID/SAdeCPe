import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Row className="my-4">
        <Col md="3" className="AdminLayout">
          <ListGroup className="mb-4">
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Bienvenido!
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">
            <ListGroupItem action active href="#" tag="a" className="AdminLayout-link">
              Capacitaciones
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Organizaciones
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Centros de Capacitacion
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Capacitadores
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Horarios
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Estados
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Empleados
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Cargos
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Departamentos
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Solicitudes <Badge pill>3</Badge>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              Cerrar Sesion
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md="9">{props.children}</Col>
      </Row>
    </Layout>
  );
};

AdminLayout.propTypes = {};

export default AdminLayout;
