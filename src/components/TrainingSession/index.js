import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Text from "../Text";
import { Calendar } from "react-multi-date-picker";
import CustomInput from "../CustomInput";
import drawerTypes from "../Drawers/drawerTypes";
import TrainingSessionMember from "./TrainingSessionMember";
import Collapse from "../Collapse";
import Clickable from "../Clickable";
import Icon from "../Icon";
import ReactDatePicker from "react-datepicker";
import { formatQuantity } from "@/services/common";
import DeleteModal from "../DeleteModal";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const TrainingSession = (props) => {
  const {
    centers = [],
    trainers = [],
    refreshTrainers,
    refreshCenters,
  } = props;
  const [formData, setFormData] = React.useState({
    ...props.data,
    from: props.data.from? props.data.from : new Date(),
    to: props.data.to? props.data.to : new Date(),
  });
  const [show, setShow] = React.useState(false);
  const [showInactives, setShowInactives] = React.useState(false);

  const [isMinimized, setIsMinimized] = React.useState(true);

  React.useEffect(() => {
    if (centers.length)
      handleChange({
        target: {
          value: formData.centerId
            ? centers.find((item) => item.id === formData.centerId)
            : centers[0],
          name: "center",
        },
      });
  }, [centers]);

  React.useEffect(() => {
    if (trainers.length)
      handleChange({
        target: {
          value: formData.trainerId
            ? trainers.find((item) => item.id === formData.trainerId)
            : trainers[0],
          name: "trainer",
        },
      });
  }, [trainers]);

  React.useEffect(() => {
    if (props.onChange) props.onChange(formData);
  }, [formData]);

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => {
      let returnObj = {
        ...prev,
        [name]: value,
      };
      const isObj = typeof value === "object";
      if (name === "dates")
        return {
          ...returnObj,
          [name]: value,
          formattedDate: [
            `${value[0].year}/${value[0].monthIndex + 1}/${value[0].day}`,
            value[1]
              ? `${value[1].year}/${value[1].monthIndex + 1}/${value[1].day}`
              : "",
          ],
        };
      if (name === "center")
        return {
          ...returnObj,
          [name]: isObj
            ? value
            : centers.find((item) => `${item.id}` === `${value}`),
          centerId: isObj ? value.id : value,
        };
      if (name === "trainer")
        return {
          ...returnObj,
          [name]: isObj
            ? value
            : trainers.find((item) => `${item.id}` === `${value}`),
          trainerId: isObj ? value.id : value,
        };
      return returnObj;
    });
  };

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      initialCost:
        (props.costUnit || 0) *
        (Array.isArray(props.data.collaborators)
          ? props.data.collaborators.filter((item) => item.active).length
          : 0),
      collaborators: props.data.collaborators,
    }));
  }, [props.costUnit, props.data.collaborators]);

  const toggleDeleteModal = () => setShow((prev) => !prev);

  const handleDeleteSession = () => {
    setFormData((prev) => {
      if (!prev.active) {
        return { ...prev, active: true, comment: "" };
      } else {
        toggleDeleteModal();
        return prev;
      }
    });
  };

  const onDelete = (comment) => {
    setFormData((prev) => ({ ...prev, active: false, comment }));
    toggleDeleteModal();
  };

  const handleChangeDate = (value) =>
    handleChange({ target: { value, name: "dates" } });

  const handleChangeTime = (name) => (value) =>
    handleChange({ target: { value, name } });

  const handleMinimize = () => setIsMinimized((prev) => !prev);

  const handleInactives = ({ target: { checked } }) => {
    setShowInactives(checked);
  };

  const handleCollaboratorChange =
    (idx) =>
    (newData, isObject = false) => {
      if (props.onChange)
        props.onChange({
          collaborators: Array.isArray(props.data.collaborators)
            ? props.data.collaborators.map((item, key) =>
                key === idx
                  ? {
                      ...item,
                      ...(isObject
                        ? newData
                        : { [newData.name]: newData.value }),
                    }
                  : item
              )
            : [],
        });
    };

  return (
    <Card className="my-2">
      <CardHeader className="d-flex justify-content-between">
        <Text>{props.title}</Text>
        <div className="ml-auto d-flex justify-content-end">
          <Clickable className="mx-1" onClick={handleMinimize}>
            <Icon name="faMinus" />
          </Clickable>
          <Clickable className="mx-1" onClick={handleDeleteSession}>
            <Icon
              name={formData.active ? "faCircleXmark" : "faArrowLeftRotate"}
            />
          </Clickable>
        </div>
      </CardHeader>
      <CardBody
        style={{
          transition: `max-height 0.15s ease-in}`,
          maxHeight: isMinimized ? "0px" : "unset",
          overflow: "hidden",
          ...(!formData.active ? { display: "none" } : {}),
          ...(isMinimized ? { padding: "0px" } : {}),
        }}
      >
        <Row className="mb-3">
          <Col sm="12" md="4">
            <Calendar
              weekDays={weekDays}
              months={months}
              value={formData["dates"]}
              onChange={handleChangeDate}
              range
              showOtherDays
            />
          </Col>
          <Col sm="12" md="8">
            <CustomInput
              label="Costo: "
              value={formatQuantity(formData.initialCost) + "$"}
              disabled
            />
            {
              <CustomInput label="De: " value={formData.from}>
                <ReactDatePicker
                  selected={formData.from}
                  onChange={handleChangeTime("from")}
                  showTimeSelect
                  showTimeSelectOnly
                  // timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="form-control"
                  required
                />
              </CustomInput>
            }
            {
              <CustomInput label="Hasta: " value={formData.to}>
                <ReactDatePicker
                  selected={formData.to}
                  onChange={handleChangeTime("to")}
                  showTimeSelect
                  showTimeSelectOnly
                  // timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="form-control"
                  required
                />
              </CustomInput>
            }
            <CustomInput
              label="Centro de capacitacion"
              type="select"
              onChange={handleChange}
              name="center"
              value={formData.center?.id}
              Drawer={drawerTypes["trainingCenter"]}
              refreshFunc={refreshCenters}
              required
            >
              {Array.isArray(centers) &&
                centers.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </CustomInput>

            <CustomInput
              label="Capacitador"
              type="select"
              onChange={handleChange}
              name="trainer"
              value={formData.trainer?.id}
              Drawer={drawerTypes["trainer"]}
              refreshFunc={refreshTrainers}
              required
            >
              {Array.isArray(trainers) &&
                trainers.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </CustomInput>
          </Col>
        </Row>
        {Array.isArray(props.data.collaborators) &&
          !!props.data.collaborators.length && (
            <Collapse
              className="TrainingSession-members"
              header={
                <Text className="w-100" TagName="div">
                  Participantes
                </Text>
              }
            >
              <CustomInput
                label="Mostrar inactivos"
                className="font-sm-size"
                type="switch"
                role="switch"
                name="status"
                onChange={handleInactives}
                size="sm"
              />
              <Table bordered className="mb-0">
                <thead>
                  <tr>
                    <th className="w-100">Nombre</th>
                    <th className="text-center px-3">Activo</th>
                    <th className="text-start px-3">Calificacion?</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.collaborators.map((item, key) => {
                    if (showInactives && item.active) return <></>;
                    if (!showInactives && !item.active) return <></>;
                    return (
                      <TrainingSessionMember
                        key={key + "-collaborator"}
                        {...item}
                        onChange={handleCollaboratorChange(key)}
                      />
                    );
                  })}
                </tbody>
              </Table>
            </Collapse>
          )}
      </CardBody>
      {show && <DeleteModal onCancel={toggleDeleteModal} onDelete={onDelete} />}
    </Card>
  );
};

TrainingSession.propTypes = {
  title: PropTypes.string,
  collaborators: PropTypes.array,
};

export default TrainingSession;
