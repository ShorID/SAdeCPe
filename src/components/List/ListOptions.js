import React from "react";
import PropTypes from "prop-types";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import Text from "../Text";

const ListOptions = (props) => {
  return (
    <>
      <UncontrolledDropdown group>
        <DropdownToggle color="link" className="SortBy-caret">
          <Tooltip tooltip="Opciones de la lista">
            <Icon name="faEllipsisVertical" />
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header><Text>Opciones de lista</Text></DropdownItem>
          <DropdownItem>
            <Icon name="faPlus" />
            <Text className="mx-2">Crear nuevo registro</Text>
          </DropdownItem>
          <DropdownItem>
            <Icon name="faFileExport" />
            <Text className="mx-2">Exportar lista</Text>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

ListOptions.propTypes = {};

export default ListOptions;
