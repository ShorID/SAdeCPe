import React from "react";
import PropTypes from "prop-types";
import { CardBody } from "reactstrap";

const ListBody = (props) => {
  return <CardBody>{props.children}</CardBody>;
};

ListBody.propTypes = {};

export default ListBody;
