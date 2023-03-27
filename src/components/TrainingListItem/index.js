import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import CustomCheck from "../CustomCheck";
import classNames from "classnames";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";
import TrainingListItemSchedule from "./TrainingListItemSchedule";

const TrainingListItem = (props) => {
  return (
    <div className={classNames("TrainingListItem", props.className)}>
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
            <CustomButton
              btnColor={props.completed ? "success" : "secondary"}
              btnSize="sm"
              btnOutline
              withoutCustom
            >
              {`Completado${props.completed ? "" : "?"}`}
            </CustomButton>
          </div>
        </div>
        <TrainingListItemSchedule data={props.sessions} />
      </div>
    </div>
  );
};

TrainingListItem.defaultProps = {
  avatar: "https://i.pravatar.cc/81",
};

TrainingListItem.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  completed: PropTypes.bool,
  className: PropTypes.string,
  sessions: PropTypes.array,
};

export default TrainingListItem;
