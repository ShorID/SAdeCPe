import React, { useContext } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import CustomCheck from "../CustomCheck";
import classNames from "classnames";
import CustomButton from "../CustomButton";
import Icon from "../Icon";
import Clickable from "../Clickable";
import Tooltip from "../Tooltip";
import TrainingListItemSchedule from "./TrainingListItemSchedule";
import { useRouter } from "next/router";
import ListContext from "@/contexts/list-context";
import { Badge } from "reactstrap";
import { formatQuantity } from "@/services/common";

const TrainingListItem = (props) => {
  const router = useRouter();

  const listContext = useContext(ListContext);

  const handleRedirect = () => {
    router.push("/admin/capacitaciones/" + props.id);
  };

  const renderOptions = () => (
    <>
      <Clickable className="mx-2" onClick={handleRedirect}>
        <Tooltip tooltip="Editar?" placement="right">
          <Icon name="faEdit" size="md2" />
        </Tooltip>
      </Clickable>
      {listContext.lastFilters?.status !== 0 && (
        <Clickable className="mx-2" onClick={listContext.handleDelete(props)}>
          <Tooltip tooltip="Eliminar?" placement="right">
            <Icon name="faTrash" size="md2" />
          </Tooltip>
        </Clickable>
      )}
    </>
  );

  return (
    <div
      className={classNames("TrainingListItem", props.className)}
      style={{ borderColor: props.priority.color }}
    >
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Text className="mx-1" bold>
            CAP-{props.id}
          </Text>
          <div className="TrainingListItem-title">
            <Text>{props.name}</Text>{" "}
            {props.state && (
              <Badge
                style={{ backgroundColor: props.state.color }}
                color={props.state.color}
              >
                <Text size="sm">{props.state.name}</Text>
              </Badge>
            )}
          </div>
          <div className="TrainingListItem-options d-none d-md-block">
            {renderOptions()}
          </div>
        </div>
        <div className="pb-2">
          <div>
            <Text size="sm">{props.description}</Text>
          </div>
          {props.external && (
            <Badge color="success">
              <Text size="sm">Externa</Text>
            </Badge>
          )}
          {props.certificated && (
            <Badge color="success">
              <Text size="sm">Certificada</Text>
            </Badge>
          )}
          <TrainingListItemSchedule data={props.sessions} />
          <div className="TrainingListItem-options d-block d-md-none w-100">
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  );
};

TrainingListItem.defaultProps = {
  avatar: "https://i.pravatar.cc/81",
};

TrainingListItem.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  completed: PropTypes.bool,
  className: PropTypes.string,
  sessions: PropTypes.array,
};

export default TrainingListItem;
