import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Text from "../Text";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const sortbyOptions = [
  { label: "A-Z", value: "character_desc" },
  { label: "Z-A", value: "character_asc" },
  { label: "Mas Nuevo", value: "date_desc" },
  { label: "Mas Antiguo", value: "date_asc" },
];

const SortBy = (props) => {
  const [selected, setSelected] = React.useState();

  const handleSelect = (newSelect) => () => setSelected(newSelect);

  return (
    <UncontrolledDropdown group className="SortBy">
      <DropdownToggle color="link" className="SortBy-caret">
        <Tooltip tooltip="Ordenar">
          <Text>
            <Icon name="faBarsStaggered" /> {selected && selected.label}
          </Text>
        </Tooltip>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          <Text>Ordernar por</Text>
        </DropdownItem>
        {sortbyOptions.map((item, key) => (
          <DropdownItem
            key={`SortBy-option-${key}`}
            onClick={handleSelect(item)}
            active={selected?.value === item.value}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

SortBy.propTypes = {};

export default SortBy;
