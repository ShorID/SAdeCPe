import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "reactstrap";
import Icon from "../Icon";
import Text from "../Text";
import classNames from "classnames";
import CustomCheck from "../CustomCheck";

const TrainingSessionMember = (props) => {
  return (
    <tr
      className={classNames(
        "TrainingSessionMember",
        !props.active && "TrainingSessionMember-disabled"
      )}
    >
      <td scope="row">{`${props.name} ${props.lastName}`}</td>
      <td className="text-center">
        <CustomCheck
          checked={props.active}
          onChange={props.onDisable}
          tooltip={false}
        />
      </td>
      <td className="text-center">
        <Button
          size="sm"
          color="primary"
          type="button"
          className="mx-1"
          disabled={!props.active}
        >
          <Icon name="faCloudUpload" />
        </Button>
      </td>
    </tr>
  );
};

TrainingSessionMember.propTypes = {};

export default TrainingSessionMember;
