import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const sortbyOptions = [
  { label: "A-Z", value: "character_desc" },
  { label: "Z-A", value: "character_asc" },
  { label: "Mas Nuevo", value: "date_desc" },
  { label: "Mas Antiguo", value: "date_asc" },
];

const SortBy = (props) => {
  return (
    <UncontrolledDropdown group className="SortBy">
      <div className="SortBy-label">
        Ordernar por:
      </div>
      <DropdownToggle caret color="link" className="SortBy-caret">
        {sortbyOptions[0].label}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        {sortbyOptions.map((item, key) => (
          <DropdownItem key={`SortBy-option-${key}`}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

SortBy.propTypes = {};

export default SortBy;
