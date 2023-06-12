import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import Link from "../Link";
import Text from "../Text";
import { useRouter } from "next/router";

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
    { label: "Razones de exoneracion", link: "/admin/razones-de-exoneracion" },
  ],
  block2: [
    { label: "Empleados", link: "/admin/empleados" },
    { label: "Cargos", link: "/admin/cargos" },
    { label: "Departamentos", link: "/admin/departamentos" },
  ],
};

const AdminOptions = () => {
  const router = useRouter();
  const renderLinks = (linkArray = []) =>
    linkArray.map((item, key) => (
      <ListGroupItem
        action
        className="AdminLayout-link"
        active={router.asPath.includes(item.link)}
        key={key}
      >
        <Link to={item.link} withoutClass>
          <Text>{item.label}</Text>
        </Link>
      </ListGroupItem>
    ));

  const handleClean = () => sessionStorage.clear()

  return (
    <>
      <ListGroup className="mb-4">
        <ListGroupItem
          action
          active={router.asPath === "/admin"}
          className="AdminLayout-link"
        >
          <Link to="/admin" withoutClass>
            <Text>Bienvenido!</Text>
          </Link>
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
        <ListGroupItem action href="/" tag="a" onClick={handleClean} className="AdminLayout-link">
          <Text>Cerrar Sesion</Text>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

AdminOptions.propTypes = {};

export default AdminOptions;
