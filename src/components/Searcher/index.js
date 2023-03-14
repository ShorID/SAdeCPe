import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const Searcher = (props) => {
  return (
    <Input
      bsSize="sm"
      type="search"
      className="Searcher"
      placeholder="Buscar..."
    />
  );
};

Searcher.propTypes = {};

export default Searcher;
