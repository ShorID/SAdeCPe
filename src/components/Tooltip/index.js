import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import uniq from "uniqid";
import classNames from "classnames";
import { Tooltip as RSTooltip } from "reactstrap";

const Tooltip = (props) => {
  const { tooltip, className, TagName = "div" } = props;
  const wrapperRef = useRef(null);
  const [id] = useState("wtf");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen((prev) => !prev);

  const isFC = typeof props.children === "function";
  console.log("prro", { isFC, id, idref: wrapperRef.current?.id, wrapperRef });
  return (
    <>
      <div id={id} className={classNames(className)} ref={wrapperRef}>
          {props.children}
        </div>
        <RSTooltip isOpen={tooltipOpen} target={id} toggle={toggle}>
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
