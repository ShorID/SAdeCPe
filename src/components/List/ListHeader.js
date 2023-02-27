import React from "react";
import PropTypes from "prop-types";
import { CardBody, CardTitle } from "reactstrap";
import SortBy from "../SortBy"
import ListOptions from "./ListOptions";

const ListHeader = (props) => {
  return (
    <CardBody className="List-header">
      <CardTitle tag="div" className="List-title">{props.title}</CardTitle>
      <div className="List-headerOptions">
        <SortBy />
        <ListOptions />
      </div>
    </CardBody>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ListHeader;
