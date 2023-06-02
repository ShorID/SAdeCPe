import React, { useContext } from "react";
import PropTypes from "prop-types";
import CustomCheck from "../CustomCheck";
import Text from "../Text";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";
import Icon from "../Icon";
import classNames from "classnames";
import ListContext from "@/contexts/list-context";

const ReasonsExemptionRow = (props) => {
  const listContext = useContext(ListContext);

  return (
    <div className={classNames("TrainingListItem", props.className)}>
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <div className="TrainingListItem-title">
            <Text bold>{props.name}</Text>
          </div>
          <div className="TrainingListItem-options">
            <Clickable className="mx-2" onClick={listContext.openEditModal(props)}>
              <Tooltip tooltip="Editar?" placement="right">
                <Icon name="faEdit" size="md2" />
              </Tooltip>
            </Clickable>
            <Clickable
              className="mx-2"
              onClick={listContext.handleDelete(props)}
            >
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

ReasonsExemptionRow.propTypes = {};

export default ReasonsExemptionRow;
