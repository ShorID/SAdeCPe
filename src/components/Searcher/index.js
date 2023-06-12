import React from "react";
import PropTypes from "prop-types";
import { Button, Input, InputGroup } from "reactstrap";
import Icon from "../Icon";

const Searcher = (props) => {
  const timeout = React.useRef(null);

  const handleChange = (e) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => props.onChange(e), 500);
  };

  return (
    <InputGroup>
      <Button
        size="sm"
        onClick={props.onFilter}
        disabled={props.withoutFilters}
      >
        <Icon name="faFilter" /> {props.showFilters? "Ocultar filtros" : "Mas filtros"}
      </Button>
      <Input
        bsSize="sm"
        type="search"
        name="search"
        onChange={handleChange}
        className="Searcher"
        placeholder="Buscar..."
      />
      <Button size="sm" color="primary">
        <Icon name="faSearch" className="mx-1" />
        Buscar
      </Button>
    </InputGroup>
  );
};

Searcher.propTypes = {
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  withoutFilters: PropTypes.bool,
  showFilters: PropTypes.bool,
};

export default Searcher;
