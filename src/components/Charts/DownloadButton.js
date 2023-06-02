import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Icon from "../Icon";

const DownloadButton = (props) => {
  return (
    <Button
      size="sm"
      color="success"
      type="button"
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        display: props.show ? "block" : "none",
      }}
      onClick={props.onClick}
    >
      <Icon name="faDownload" />
    </Button>
  );
};

DownloadButton.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DownloadButton;
