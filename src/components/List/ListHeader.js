import React from "react";
import PropTypes from "prop-types";
import { CardBody, CardTitle } from "reactstrap";
import SortBy from "../SortBy"

const ListHeader = (props) => {
  return (
    <CardBody className="List-header">
      <CardTitle tag="div" className="List-title">{props.title}</CardTitle>
      <div className="List-headerOptions">
        <SortBy />
      </div>
    </CardBody>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ListHeader;
