import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CustomCheck from "../CustomCheck";
import Tooltip from "../Tooltip";
import Text from "../Text";
import Clickable from "../Clickable";
import Icon from "../Icon";
import CustomButton from "../CustomButton";
import ListContext from "@/contexts/list-context";

const TrainerRows = (props) => {
  const listContext = useContext(ListContext);
  return (
    <div className={classNames("TrainingListItem", props.className)}>
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <div className="TrainingListItem-title">
            <Text>{props.name}</Text>
          </div>
          <div className="TrainingListItem-options">
            <Clickable
              className="mx-2"
              onClick={listContext.openEditModal(props)}
            >
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
          <Text size="sm">{props.identification}</Text>
        </div>
      </div>
    </div>
  );
};

TrainerRows.defaultProps = {
  photo: "https://i.pravatar.cc/81",
};

TrainerRows.propTypes = {};

export default TrainerRows;
