import React from "react";
import PropTypes from "prop-types";
import CustomCheck from "../CustomCheck";
import Text from "../Text";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";
import Icon from "../Icon";
import classNames from "classnames";
import fetcher from "@/services/fetcher";
import { Badge } from "reactstrap";

const EmployeesPositionRows = (props) => {
  const handleDelete = () =>
    fetcher({
      url: "/employees-position/delete/" + props.id,
      method: "DELETE",
    });

  return (
    <div className={classNames("TrainingListItem", props.className)}>
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <div className="TrainingListItem-title">
            <Text bold>{props.name}</Text>
            {" - "}
            {props.departament && (
              <Badge color="primary">
                <Text size="sm">{props.departament.name}</Text>
              </Badge>
            )}
          </div>
          <div className="TrainingListItem-options">
            <Clickable className="mx-2">
              <Tooltip tooltip="Editar?" placement="right">
                <Icon name="faEdit" size="md2" />
              </Tooltip>
            </Clickable>
            <Clickable className="mx-2" onClick={handleDelete}>
              <Tooltip tooltip="Eliminar?" placement="right">
                <Icon name="faTrash" size="md2" />
              </Tooltip>
            </Clickable>
          </div>
        </div>
        <div className="d-block">
          <Text size="sm">{props.description}</Text>
        </div>
      </div>
    </div>
  );
};

EmployeesPositionRows.propTypes = {};

export default EmployeesPositionRows;
