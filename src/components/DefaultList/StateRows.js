import React from "react";
import PropTypes from "prop-types";
import CustomCheck from "../CustomCheck";
import classNames from "classnames";
import Tooltip from "../Tooltip";
import Text from "../Text";
import Clickable from "../Clickable";
import Icon from "../Icon";
import { getRandomColor } from "@/services/common";

const StateRows = (props) => {
  const randColor = getRandomColor();
  return (
    <div
      className={classNames("TrainingListItem", props.className)}
      style={{ borderBottom: `1px solid ${randColor}` }}
    >
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Tooltip
            tooltip="Organizacion Logo"
            className="TrainingListItem-avatarWrapper"
          >
            <img
              className="TrainingListItem-avatar"
              src={props.avatar}
              alt={props.title}
            />
          </Tooltip>
          <div className="TrainingListItem-title">
            <Text>{props.title}</Text>
          </div>
          <div className="TrainingListItem-options">
            <Clickable className="mx-2">
              <Tooltip tooltip="Editar?" placement="right">
                <Icon name="faEdit" size="md2" />
              </Tooltip>
            </Clickable>
          </div>
        </div>
      </div>
    </div>
  );
};

StateRows.propTypes = {};

export default StateRows;
