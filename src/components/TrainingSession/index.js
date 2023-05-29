import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Text from "../Text";
import { Calendar } from "react-multi-date-picker";
import CustomInput from "../CustomInput";
import drawerTypes from "../Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import TrainingSessionMember from "./TrainingSessionMember";
import Collapse from "../Collapse";
import Clickable from "../Clickable";
import Icon from "../Icon";
import ReactDatePicker from "react-datepicker";
import { formatQuantity } from "@/services/common";

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
  const [formData, setFormData] = React.useState({
    title: props.title,
    ...(props.data
      ? {
          ...props.data,
          from: props.data.from && new Date("01/01/1970 " + props.data.from),
          to: props.data.to && new Date("01/01/1970 " + props.data.to),
        }
      : {}),
  });

  const [centers, setCenters] = React.useState([]);
  const [trainers, setTrainers] = React.useState([]);
  const [isMinimized, setIsMinimized] = React.useState(true);

  const getCenters = () => {
    fetcher({ url: "/center" }).then(({ data }) => {
      if (Array.isArray(data)) setCenters(data);
      if (data.length)
        handleChange({
          target: {
            value: formData.centerId
              ? data.find((item) => item.id === formData.centerId)
              : data[0],
            name: "center",
          },
        });
    });
  };

  const getTrainers = () => {
    fetcher({ url: "/trainer" }).then(({ data }) => {
      if (Array.isArray(data)) setTrainers(data);
      if (data.length)
        handleChange({
          target: {
            value: formData.trainerId
              ? data.find((item) => item.id === formData.trainerId)
              : data[0],
            name: "trainer",
          },
        });
    });
  };

  React.useEffect(() => {
    getCenters();
    getTrainers();
  }, []);

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
            `${value[0].year}/${value[0].monthIndex}/${value[0].day}`,
            value[1]
              ? `${value[1].year}/${value[1].monthIndex}/${value[1].day}`
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
          ? props.data.collaborators.length
          : 0),
      collaborators: props.data.collaborators,
    }));
  }, [props.costUnit, props.data.collaborators]);

  const handleDeleteSession = () =>
    setFormData((prev) => ({ ...prev, active: !prev.active }));

  const handleChangeDate = (value) =>
    handleChange({ target: { value, name: "dates" } });

  const handleChangeTime = (name) => (value) =>
    handleChange({ target: { value, name } });

  const handleMinimize = () => setIsMinimized((prev) => !prev);

  const handleCollaboratorDisable = (idx) => (disabled) => {
    if (props.onChange)
      props.onChange({
        collaborators: Array.isArray(props.data.collaborators)
          ? props.data.collaborators.map((item, key) =>
              key === idx ? { ...item, active: disabled } : item
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
            <CustomInput
              label="Centro de capacitacion"
              type="select"
              onChange={handleChange}
              name="center"
              value={formData.center?.id}
              Drawer={drawerTypes["trainingCenter"]}
              refreshFunc={getCenters}
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
              refreshFunc={getTrainers}
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
              contentClass="TrainingSession-membersContainer"
              header={
                <Text className="w-100" TagName="div">
                  Participantes
                </Text>
              }
            >
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th className="w-100">Nombre</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Archivos</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.collaborators.map((item, key) => (
                    <TrainingSessionMember
                      key={key + "-collaborator"}
                      {...item}
                      onDisable={handleCollaboratorDisable(key)}
                    />
                  ))}
                </tbody>
              </Table>
            </Collapse>
          )}
      </CardBody>
    </Card>
  );
};

TrainingSession.propTypes = {
  title: PropTypes.string,
  collaborators: PropTypes.array,
};

export default TrainingSession;
