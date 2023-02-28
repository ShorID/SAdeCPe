import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tooltip as RSTooltip } from "reactstrap";

const Tooltip = (props) => {
  const { tooltip, className, TagName = "div" } = props;
  const wrapperRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen((prev) => !prev);

  return (
    <>
      <TagName className={classNames(className)} ref={wrapperRef}>
        {props.children}
      </TagName>
      <RSTooltip isOpen={tooltipOpen} target={wrapperRef} toggle={toggle}>
        {tooltip}
      </RSTooltip>
    </>
  );
};

Tooltip.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  TagName: PropTypes.oneOf(["div", "span", "p"]),
};

export default Tooltip;
