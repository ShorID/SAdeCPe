import React from "react";
import PropTypes from "prop-types";
import { CardBody, CardSubtitle, CardTitle } from "reactstrap";

const ListHeader = (props) => {
  return (
    <CardBody>
      <CardTitle tag="h5">{props.title}</CardTitle>
      <CardSubtitle className="mb-2 text-muted" tag="h6">
        {props.subTitle}
      </CardSubtitle>
    </CardBody>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ListHeader;
