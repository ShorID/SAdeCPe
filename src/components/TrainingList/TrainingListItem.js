import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import CustomCheck from "../CustomCheck";

const TrainingListItem = (props) => {
  return (
    <div className="TrainingListItem">
      <CustomCheck />
      <img
        className="TrainingListItem-avatar"
        src={props.avatar}
        alt={props.title}
      />
      <div className="TrainingListItem-title">
        <Text>
            {props.title}
        </Text>
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
};

export default TrainingListItem;
