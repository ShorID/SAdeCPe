import React from "react";
import PropTypes from "prop-types";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import useID from "@/hooks/useID";

const CustomAccordionItem = (props) => {
  const [uniqId] = useID();
  return (
    <AccordionItem>
      <AccordionHeader targetId={uniqId}>{props.header}</AccordionHeader>
      <AccordionBody accordionId={uniqId}>{props.children}</AccordionBody>
    </AccordionItem>
  );
};

CustomAccordionItem.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default CustomAccordionItem;
