import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { loremIpsum  } from "react-lorem-ipsum";
import classnames from "classnames";

const Text = (props) => {
  const { TagName = "span", className } = props;
  if (!props.text && !props.children)
    return loremIpsum({ p: 1, avgSentencesPerParagraph: 1 })
  return (
    <TagName className={classnames("Text", className)}>
      {props.text || props.children}
    </TagName>
  );
};

Text.propTypes = {
  TagName: oneOfType(["span", "h1", "h2", "h3", "h4", "h5", "p", "pre", "div"]),
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Text;
