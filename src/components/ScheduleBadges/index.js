import React from "react";
import PropTypes from "prop-types";
import ScheduleBadge from "./ScheduleBadge";

const ScheduleBadges = (props) => {
  return (
    <div className="ScheduleBadges">
      {Array.isArray(props.sessions) &&
        props.sessions.map((item, i) => <ScheduleBadge {...item} key={i} />)}
    </div>
  );
};

ScheduleBadges.propTypes = {
  sessions: PropTypes.array,
  trainingTitle: PropTypes.string,
};

export default ScheduleBadges;
