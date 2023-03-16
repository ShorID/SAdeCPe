import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import Text from "../Text";
import { useRouter } from "next/router";

const AdminLayout = (props) => {
  const router = useRouter()
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
              href="/admin"
              tag="a"
              className="AdminLayout-link"
              active={router.asPath}
              
            >
              <Text>Capacitaciones</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/organizaciones"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Organizaciones</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/centros-de-capacitacion"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Centros de Capacitacion</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/capacitadores"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Capacitadores</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/horarios"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Horarios</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/estados"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Estados</Text>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">
            <ListGroupItem
              action
              href="/admin/empleados"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Empleados</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/cargos"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Cargos</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/departamentos"
              tag="a"
              className="AdminLayout-link"
            >
              <Text>Departamentos</Text>
            </ListGroupItem>
            <ListGroupItem
              action
              href="/admin/solicitudes"
              tag="a"
              className="AdminLayout-link"
            >
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
