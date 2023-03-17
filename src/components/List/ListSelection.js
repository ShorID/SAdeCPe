import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Clickable from "../Clickable";
import Collapse from "../Collapse";
import CustomCheck from "../CustomCheck";

const ListSelection = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="ListSelection">
      <Clickable onClick={handleOpen} className="ListSelection-btn">
        <Icon
          name="faCircle"
          size="md"
        />
        <Icon
          name={isOpen ? "faChevronCircleUp" : "faChevronCircleDown"}
          size="md2"
        />
      </Clickable>
      <Collapse isOpen={isOpen} manual>
        <div className="ListSelection-content">
          <CustomCheck label="Seleccionar todos" wrapperClass="d-flex mb-0 aling-items-center " className="mb-0" />
        </div>
      </Collapse>
    </div>
  );
};

ListSelection.propTypes = {};

export default ListSelection;
