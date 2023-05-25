import React from "react";
import PropTypes from "prop-types";
import fetcher from "@/services/fetcher";

const AvatarRow = (props) => {
  return (
    <a href={fetcher.defaults.baseURL + props.photo} target="_blank" rel="noopener noreferrer">
      <img
      className="TrainingListItem-avatar"
      src={fetcher.defaults.baseURL + props.photo}
      alt={props.name}
    />
    </a>
  );
};

AvatarRow.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
};

export default AvatarRow;
