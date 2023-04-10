import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const Searcher = (props) => {
  return (
    <Input
      bsSize="sm"
      type="search"
      name="search"
      onChange={props.onChange}
      className="Searcher"
      placeholder="Buscar..."
    />
  );
};

Searcher.propTypes = {
  onChange: PropTypes.func
};

export default Searcher;
