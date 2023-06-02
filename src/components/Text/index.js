import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getRandomText } from "@/services/common";
import DefaultDataProvider from "../DefaultDataProvider";

const getDefaultProps = () => ({
  text: getRandomText(),
});

const Text = (props) => {
  const { TagName = "span", className, bold, size = "md" } = props;

  return (
    <TagName
      className={classnames(
        "Text",
        "Text-size-" + size,
        bold && "Text-bold",
        className
      )}
    >
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
    "h6",
    "p",
    "pre",
    "div",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  text: PropTypes.string,
  bold: PropTypes.bool,
};

export default Text;
