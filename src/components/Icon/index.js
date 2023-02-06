import React from "react";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Icon = ({ name, className }) => {
  return (
    <FontAwesomeIcon
      icon={SolidIcons[name]}
      className={className}
    />
  );
};

Icon.propTypes = { name: PropTypes.string, className: PropTypes.string };

export default Icon;
