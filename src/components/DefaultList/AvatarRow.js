import React from "react";
import PropTypes from "prop-types";

const defaultAvatar = "https://i.pravatar.cc/81"

const AvatarRow = (props) => {
  const src = props.photo? process.env.NEXT_PUBLIC_API_URL + props.photo : defaultAvatar;
  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <img
      className="TrainingListItem-avatar"
      src={src}
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
