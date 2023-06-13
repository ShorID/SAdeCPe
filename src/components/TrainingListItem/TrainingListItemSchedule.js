import React from "react";
import PropTypes from "prop-types";
import ScheduleBadges from "../ScheduleBadges";

const TrainingListItemSchedule = (props) => {
  return (
    Array.isArray(props.data) &&
    !!props.data.length && (
      <div className="my-2">
        <ScheduleBadges sessions={props.data} />
      </div>
    )
  );
};

TrainingListItemSchedule.propTypes = {
  data: PropTypes.array,
};

export default TrainingListItemSchedule;
