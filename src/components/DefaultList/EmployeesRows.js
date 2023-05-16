import React, { useContext } from "react";
import PropTypes from "prop-types";
import CustomCheck from "../CustomCheck";
import Text from "../Text";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";
import Icon from "../Icon";
import classNames from "classnames";
import { Badge } from "reactstrap";
import ListContext from "@/contexts/list-context";
import { useRouter } from "next/router";
import { ChartExample } from "../ChartExample";
import Popup from "../Popup";
import fetcher from "@/services/fetcher";

const EmployeesRows = (props) => {
  const router = useRouter();
  const listContext = useContext(ListContext);

  const handleEdit = () => router.push(`/admin/empleados/${props.id}`);

  const handleCheck = (isChecked) => {
    listContext.handleSelect(isChecked, props);
  };

  return (
    <div className={classNames("TrainingListItem", props.className)}>
      {!props.withoutCheck && (
        <CustomCheck
          onChange={handleCheck}
          checked={listContext.isSelected(props)}
        />
      )}
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Tooltip tooltip={props.name} className="TrainingListItem-avatarWrapper">
            <img
              className="TrainingListItem-avatar"
              src={fetcher.defaults.baseURL + props.photo}
              alt={props.name}
            />
          </Tooltip>
          <div className="TrainingListItem-title">
            <Text bold>{`${props.name} ${props.lastName}`}</Text>
          </div>
          <div className="TrainingListItem-options">
            {!props.withoutEdit && (
              <Clickable className="mx-2" onClick={handleEdit}>
                <Tooltip tooltip="Editar?" placement="right">
                  <Icon name="faEdit" size="md2" />
                </Tooltip>
              </Clickable>
            )}
            {!props.withoutDelete && (
              <Clickable
                className="mx-2"
                onClick={listContext.handleDelete(props)}
              >
                <Tooltip tooltip="Eliminar?" placement="right">
                  <Icon name="faTrash" size="md2" />
                </Tooltip>
              </Clickable>
            )}
            {!props.withoutPrint && (
              <Clickable
                className="mx-2"
                onClick={listContext.handleDelete(props)}
              >
                <Tooltip tooltip="Imprimir?" placement="right">
                  <Icon name="faPrint" size="md2" />
                </Tooltip>
              </Clickable>
            )}
            <Popup title="Estadisticas" description={<ChartExample />}>
              <Tooltip tooltip="Ver datos" placement="right">
                <Icon name="faCubesStacked" />
              </Tooltip>
            </Popup>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div className="mx-2">
            <Text size="sm">Cargo: </Text>
            {props.position && (
              <Badge color="primary">
                <Text size="sm">{props.position.name}</Text>
              </Badge>
            )}
          </div>
          |
          <div className="mx-2">
            <Text size="sm">Departamento: </Text>
            {props.position?.departament && (
              <Badge color="primary">
                <Text size="sm">{props.position.departament.name}</Text>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeesRows.propTypes = {};

export default EmployeesRows;
