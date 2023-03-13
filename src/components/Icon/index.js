import React from "react";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import classNames from "classnames";

const Icon = ({ name, className, id, size }) => {
  return (
    <FontAwesomeIcon
      icon={SolidIcons[name]}
      className={classNames(className, size && "Icon", size)}
      id={id}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "md2", "lg"]),
};

export default Icon;
