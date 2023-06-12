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

export const sortbyOptions = [
  { label: "Mas Nuevo", value: "date_desc" },
  { label: "Mas Antiguo", value: "date_asc" },
  { label: "A-Z", value: "character_asc" },
  { label: "Z-A", value: "character_desc" },
];

const SortBy = (props) => {
  const [selected, setSelected] = React.useState(sortbyOptions[0]);

  const handleSelect = (newSelect) => () => {
    setSelected(newSelect);
    if (props.onChange) props.onChange({ target: { value: newSelect.value } });
  };

  return (
    <UncontrolledDropdown group className="SortBy">
      <DropdownToggle color="link" className="SortBy-caret">
        <Tooltip tooltip="Ordenar">
          <Text className="d-none d-md-block">
            <Icon name="faBarsStaggered" /> {selected && selected.label}
          </Text>
          <Text className="d-block d-md-none">
            <Icon name="faBarsStaggered" />
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
