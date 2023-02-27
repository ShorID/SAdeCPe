import React from "react";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Icon = ({ name, className, id }) => {
  return (
    <FontAwesomeIcon icon={SolidIcons[name]} className={className} id={id} />
  );
};

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Icon;
