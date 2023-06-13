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
import Popup from "../Popup";
import AvatarRow from "./AvatarRow";
import EmployeeTags from "../Charts/EmployeeTags";
import { useState } from "react";

const EmployeesRows = (props) => {
  const router = useRouter();
  const [showChart, setShowChart] = useState(false);
  const listContext = useContext(ListContext);

  const handleEdit = () => router.push(`/admin/empleados/${props.id}`);
  const handlePrint = () =>
    router.push(`/admin/empleados/estadistica/${props.id}`);
  const handleChart = () => setShowChart((prev) => !prev);

  const handleCheck = (isChecked) => {
    listContext.handleSelect(isChecked, props);
  };

  const renderOptions = () => (
    <>
      {!props.withoutEdit && (
        <Clickable className="mx-2" onClick={handleEdit}>
          <Tooltip tooltip="Editar?" placement="right">
            <Icon name="faEdit" size="md2" />
          </Tooltip>
        </Clickable>
      )}
      {!props.withoutDelete && listContext.lastFilters?.status !== 0 && (
        <Clickable className="mx-2" onClick={listContext.handleDelete(props)}>
          <Tooltip tooltip="Eliminar?" placement="right">
            <Icon name="faTrash" size="md2" />
          </Tooltip>
        </Clickable>
      )}
      {!props.withoutPrint && (
        <Clickable className="mx-2" onClick={handlePrint}>
          <Tooltip tooltip="Imprimir?" placement="right">
            <Icon name="faPrint" size="md2" />
          </Tooltip>
        </Clickable>
      )}
      <Clickable onClick={handleChart} className="mx-2">
        <Tooltip tooltip="Ver datos" placement="right">
          <Icon name={showChart ? "faEyeSlash" : "faEye"} />
        </Tooltip>
      </Clickable>
    </>
  );

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
          <Tooltip
            tooltip={props.name}
            className="TrainingListItem-avatarWrapper"
          >
            <AvatarRow photo={props.photo} name={props.name} />
          </Tooltip>
          <div className="TrainingListItem-title">
            <Text bold>{`${props.name} ${props.lastName}`}</Text>
          </div>
          <div className="TrainingListItem-options d-none d-md-block">
            {renderOptions()}
          </div>
        </div>
        <div className="d-flex mb-2 flex-wrap">
          <div className="mx-2">
            <Text size="sm">Cargo: </Text>
            {props.position && (
              <Badge color="primary">
                <Text size="sm">{props.position.name}</Text>
              </Badge>
            )}
          </div>
          <div className="mx-2">
            <Text size="sm">Departamento: </Text>
            {props.position?.departament && (
              <Badge color="primary">
                <Text size="sm">{props.position.departament.name}</Text>
              </Badge>
            )}
          </div>
        </div>
        {showChart && (
          <div className="w-50">
            <EmployeeTags id={props.id} />
          </div>
        )}
        <div className="TrainingListItem-options d-block d-md-none w-100">
          {renderOptions()}
        </div>
      </div>
    </div>
  );
};

EmployeesRows.propTypes = {};

export default EmployeesRows;
