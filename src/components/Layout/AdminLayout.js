import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Badge, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import Text from "../Text";
import { useRouter } from "next/router";
import Link from "../Link";

const links = {
  block1: [
    { label: "Capacitaciones", link: "/admin/capacitaciones" },
    { label: "Organizaciones", link: "/admin/organizaciones" },
    {
      label: "Centros de Capacitacion",
      link: "/admin/centros-de-capacitacion",
    },
    { label: "Capacitadores", link: "/admin/capacitadores" },
    { label: "Estados", link: "/admin/estados" },
    { label: "Nivel de prioridad", link: "/admin/nivel-de-prioridad" },
  ],
  block2: [
    { label: "Empleados", link: "/admin/empleados" },
    { label: "Cargos", link: "/admin/cargos" },
    { label: "Departamentos", link: "/admin/departamentos" },
  ],
};

const AdminLayout = (props) => {
  const router = useRouter();

  const renderLinks = (linkArray = []) =>
    linkArray.map((item, key) => (
      <ListGroupItem
        action
        className="AdminLayout-link"
        active={router.asPath === item.link}
        key={key}
      >
        <Link to={item.link} withoutClass>
          <Text>{item.label}</Text>
        </Link>
      </ListGroupItem>
    ));

  return (
    <Layout>
      <Row className="my-4">
        <Col md="3" className="AdminLayout">
          <ListGroup className="mb-4">
            <ListGroupItem
              action
              href="/admin"
              tag="a"
              active={router.asPath === "/admin"}
              className="AdminLayout-link"
            >
              <Text>Bienvenido!</Text>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mb-4">{renderLinks(links.block1)}</ListGroup>
          <ListGroup className="mb-4">
            {renderLinks(links.block2)}
            {/* <ListGroupItem
              action
              href="/admin/solicitudes"
              tag="a"
              className="AdminLayout-link"
              active={"/admin/solicitudes" === router.asPath}
            >
              <Text>
                Solicitudes <Badge pill>3</Badge>
              </Text>
            </ListGroupItem> */}
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
