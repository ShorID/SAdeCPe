import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getRandomText } from "@/services/common";
import DefaultDataProvider from "../DefaultDataProvider";

const getDefaultProps = () => ({
  text: getRandomText(),
});

const Text = (props) => {
  const { TagName = "span", className } = props;

  return (
    <TagName className={classnames("Text", className)}>
      <DefaultDataProvider getDefaultProps={getDefaultProps}>
        {(defaultData) => props.text || props.children || defaultData?.text}
      </DefaultDataProvider>
    </TagName>
  );
};

Text.propTypes = {
  TagName: PropTypes.oneOf([
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "p",
    "pre",
    "div",
  ]),
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Text;
