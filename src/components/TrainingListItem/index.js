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

  return (
    <div
      className={classNames("TrainingListItem", props.className)}
      style={{ borderColor: props.priority.color }}
    >
      <CustomCheck />
      <div className="TrainingListItem-content">
        <div className="TrainingListItem-mainInfo">
          <Tooltip
            tooltip="Organizacion Logo"
            className="TrainingListItem-avatarWrapper"
          >
            <img
              className="TrainingListItem-avatar"
              src={props.avatar}
              alt={props.title}
            />
          </Tooltip>
          <div className="TrainingListItem-title">
            <Text>{props.name}</Text> -{" "}
            {props.state && (
              <Badge
                style={{ backgroundColor: props.state.color }}
                color={props.state.color}
              >
                <Text size="sm">{props.state.name}</Text>
              </Badge>
            )}
          </div>
          {/* <div> */}
          <div className="mx-auto">
            <Text size="sm" bold>
              Organizacion:{" "}
            </Text>
            <Text size="sm">{props.org?.name}</Text>
          </div>
          <div className="mx-1">
            <Text size="sm" bold>
              Personas inscritas:{" "}
            </Text>
            <Text size="sm">{props.totalColEnrolled}</Text>
          </div>
          <div className="mx-auto">
            <Text size="sm" bold>
              Costo final:{" "}
            </Text>
            <Text size="sm">{formatQuantity(props.costFinal)}</Text>
          </div>
          <div className="TrainingListItem-options">
            <Clickable className="mx-2" onClick={handleRedirect}>
              <Tooltip tooltip="Editar?" placement="right">
                <Icon name="faEdit" size="md2" />
              </Tooltip>
            </Clickable>
            {listContext.lastFilters?.status !== 0 && (
              <Clickable
                className="mx-2"
                onClick={listContext.handleDelete(props)}
              >
                <Tooltip tooltip="Eliminar?" placement="right">
                  <Icon name="faTrash" size="md2" />
                </Tooltip>
              </Clickable>
            )}
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
