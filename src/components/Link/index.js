import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import classNames from "classnames";

const Link = (props) => {
  return (
    <NextLink
      className={classNames(!props.withoutClass && "Link", props.className)}
      href={props.to || "/"}
    >
      {props.text || props.children}
    </NextLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  withoutClass: PropTypes.bool,
};

export default Link;
