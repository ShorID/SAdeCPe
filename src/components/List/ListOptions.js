import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const ListOptions = (props) => {
  return (
    <>
      <Button
        id="FixedID_ListOptions"
        type="button"
        color="link"
        className="ListOptions-btn"
      >
        <Tooltip tooltip="wtf" TagName="span">{<Icon name="faEllipsisVertical" />}</Tooltip>
      </Button>
      <UncontrolledPopover
        placement="bottom"
        target="FixedID_ListOptions"
        trigger="legacy"
      >
        <PopoverHeader>List Options</PopoverHeader>
        <PopoverBody>Aqui se mostraran las opciones de la lista</PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

ListOptions.propTypes = {};

export default ListOptions;
