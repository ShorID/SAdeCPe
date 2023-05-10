import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "reactstrap";
import Icon from "../Icon";
import Text from "../Text";
import classNames from "classnames";

const TrainingSessionMember = (props) => {
  const [disabled, setDisabled] = React.useState(props.disabled);

  const onDisable = () => setDisabled((prev) => !prev);

  return (
    <Row
      className={classNames(
        "TrainingSessionMember",
        disabled && "TrainingSessionMember-disabled"
      )}
    >
      <Col>
        <Text>{props.name}</Text>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          size="sm"
          color="warning"
          type="button"
          className="mx-1"
          onClick={onDisable}
        >
          <Icon name={disabled ? "faUserPlus" : "faUserMinus"} />
        </Button>
        <Button
          size="sm"
          color="primary"
          type="button"
          className="mx-1"
          disabled={disabled}
        >
          <Icon name="faCloudUpload" />
        </Button>
      </Col>
    </Row>
  );
};

TrainingSessionMember.propTypes = {};

export default TrainingSessionMember;
