import React from "react";
import PropTypes from "prop-types";
import { CardBody } from "reactstrap";

const ListBody = (props) => {
  return <CardBody className={props.className}>{props.children}</CardBody>;
};

ListBody.propTypes = {
  className: PropTypes.string
};

export default ListBody;
