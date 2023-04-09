import React, { useContext } from "react";
import PropTypes from "prop-types";
import CustomCheck from "../CustomCheck";
import classNames from "classnames";
import Tooltip from "../Tooltip";
import Text from "../Text";
import Clickable from "../Clickable";
import Icon from "../Icon";
import { Badge } from "reactstrap";
import fetcher from "@/services/fetcher";
import ListContext from "@/contexts/list-context";

const StateRows = (props) => {
  const listContext = useContext(ListContext);

  return (
    <div
      className={classNames("TrainingListItem", props.className)}
      style={{ borderBottom: `1px solid ${props.color}` }}
    >
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Tooltip tooltip={props.color} className="StateRows-avatarWrapper">
            <span
              className="StateRows-color"
              style={{ backgroundColor: props.color }}
            ></span>
          </Tooltip>
          <div className="TrainingListItem-title">
            <Text bold>{props.name}</Text>
            {" - "}
            {props.typeState && (
              <Badge color="primary">
                <Text size="sm">{props.typeState.nameType}</Text>
              </Badge>
            )}
          </div>
          <div className="TrainingListItem-options">
            <Clickable className="mx-2">
              <Tooltip tooltip="Editar?" placement="right">
                <Icon name="faEdit" size="md2" />
              </Tooltip>
            </Clickable>
            <Clickable className="mx-2" onClick={listContext.handleDelete(props)}>
              <Tooltip tooltip="Eliminar?" placement="right">
                <Icon name="faTrash" size="md2" />
              </Tooltip>
            </Clickable>
          </div>
        </div>
        <div className="d-block">
          <Text size="sm">{props.description}</Text>
        </div>
      </div>
    </div>
  );
};

StateRows.propTypes = {};

export default StateRows;
