import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import classNames from "classnames";

const Link = (props) => {
  return (
    <NextLink className={classNames("Link",props.className)} href={props.to || "/"}>
      {props.text || props.children}
    </NextLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  text: PropTypes.string,
};

export default Link;
