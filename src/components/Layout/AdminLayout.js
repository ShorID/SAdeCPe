import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Row className="my-4">
        <Col md="3">
          <ListGroup className="mb-4">
            <ListGroupItem action href="#" tag="a">
              Bienvenido!
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem action active href="#" tag="a">
              Capacitaciones
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a">
              Empleados
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a">
              Organizaciones
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a">
              Horarios
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a">
              Estados
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a">
              Solicitudes <Badge pill>3</Badge>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mt-4">
            <ListGroupItem action href="#" tag="a">
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
