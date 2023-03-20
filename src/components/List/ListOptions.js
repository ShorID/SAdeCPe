import React, { useContext } from "react";
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
import ListContext from "@/contexts/list-context";

const ListOptions = (props) => {
  const { onOpenForm } = useContext(ListContext)
  return (
    <>
      <UncontrolledDropdown group>
        <DropdownToggle color="link" className="SortBy-caret">
          <Tooltip tooltip="Opciones de la lista">
            <Icon name="faEllipsisVertical" />
          </Tooltip>
        </DropdownToggle>
        <DropdownMenu className="py-1">
          <DropdownItem header>
            <Text>Opciones de lista</Text>
          </DropdownItem>
          <DropdownItem onClick={onOpenForm}>
            <Icon name="faPlus" />
            <Text className="mx-2">Crear nuevo registro</Text>
          </DropdownItem>
          <DropdownItem>
            <Icon name="faFileExport" />
            <Text className="mx-2">Exportar lista</Text>
          </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem>
            <Icon name="faBorderAll" />
            <Text className="mx-2">Seleccionar todos</Text>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

ListOptions.propTypes = {};

export default ListOptions;
