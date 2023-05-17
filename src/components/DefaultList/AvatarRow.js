import React from "react";
import PropTypes from "prop-types";
import fetcher from "@/services/fetcher";

const AvatarRow = (props) => {
  return (
    <img
      className="TrainingListItem-avatar"
      src={fetcher.defaults.baseURL + props.photo}
      alt={props.name}
    />
  );
};

AvatarRow.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
};

export default AvatarRow;
