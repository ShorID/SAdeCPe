import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { UncontrolledTooltip as RSTooltip } from "reactstrap";
import useID from "@/hooks/useID";

const Tooltip = (props) => {
  const { tooltip, className, TagName = "div" } = props;
  const wrapperRef = useRef(null);
  const [uniqId] = useID();

  return (
    <React.Fragment>
      <TagName className={className} ref={wrapperRef} id={uniqId} style={{ lineHeight: "initial" }}>
        {props.children}
      </TagName>
      <RSTooltip
        target={uniqId}
        placement={props.placement || "bottom"}
      >
        {tooltip}
      </RSTooltip>
    </React.Fragment>
  );
};

Tooltip.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  TagName: PropTypes.oneOf(["div", "span", "p"]),
  placement: PropTypes.string,
};

export default Tooltip;
