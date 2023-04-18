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

const OrgRows = (props) => {
  const listContext = useContext(ListContext);
  return (
    <div className={classNames("TrainingListItem", props.className)}>
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Tooltip tooltip="Centro" className="TrainingListItem-avatarWrapper">
            <img
              className="TrainingListItem-avatar"
              src={props.photo}
              alt={props.name}
            />
          </Tooltip>
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
          <Text size="sm">{props.address}</Text>
        </div>
      </div>
    </div>
  );
};

OrgRows.defaultProps = {
  photo: "https://i.pravatar.cc/81",
};

OrgRows.propTypes = {};

export default OrgRows;
