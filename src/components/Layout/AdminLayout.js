import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import Text from "../Text";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Row className="my-4">
        <Col md="3" className="AdminLayout">
          <ListGroup className="mb-4">
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Bienvenido!</Text>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">
            <ListGroupItem
              action
              active
              href="#"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Capacitaciones</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Organizaciones</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Centros de Capacitacion</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Capacitadores</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Horarios</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Estados</Text>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Empleados</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Cargos</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Departamentos</Text>
            </ListGroupItem>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>
                Solicitudes <Badge pill>3</Badge>
              </Text>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem action href="#" tag="a" className="AdminLayout-link">
              <Text>Cerrar Sesion</Text>
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
