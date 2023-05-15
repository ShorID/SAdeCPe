import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Text from "../Text";
import { Calendar } from "react-multi-date-picker";
import CustomInput from "../CustomInput";
import drawerTypes from "../Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import TrainingSessionMember from "./TrainingSessionMember";
import Collapse from "../Collapse";
import Clickable from "../Clickable";
import Icon from "../Icon";
import ReactInputMask from "react-input-mask";
import ReactDatePicker from "react-datepicker";

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
    collaborators: props.data.collaborators,
  });
  const [centers, setCenters] = React.useState([]);
  const [trainers, setTrainers] = React.useState([]);
  const [isMinimized, setIsMinimized] = React.useState(true);

  const getCenters = () => {
    fetcher({ url: "/center" }).then(({ data }) => {
      if (Array.isArray(data)) setCenters(data);
      if (data.length)
        handleChange({ target: { value: data[0], name: "center" } });
    });
  };

  const getTrainers = () => {
    fetcher({ url: "/trainer" }).then(({ data }) => {
      if (Array.isArray(data)) setTrainers(data);
      if (data.length)
        handleChange({ target: { value: data[0], name: "trainer" } });
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
            `${value[0].day}/${value[0].monthIndex}/${value[0].year}`,
            value[1]
              ? `${value[1].day}/${value[1].monthIndex}/${value[1].year}`
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

  const handleChangeDate = (value) =>
    handleChange({ target: { value, name: "dates" } });

  const handleChangeTime = (name) => (value) =>
    handleChange({ target: { value, name } });

  const handleMinimize = () => setIsMinimized((prev) => !prev);

  return (
    <Card className="my-2">
      <CardHeader className="d-flex justify-content-between">
        <Text>{props.title}</Text>
        <div className="ml-auto d-flex justify-content-end">
          <Clickable className="mx-1" onClick={handleMinimize}>
            <Icon name="faMinus" />
          </Clickable>
          <Clickable className="mx-1">
            <Icon name="faCircleXmark" />
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
              onChange={handleChangeDate}
              range
              showOtherDays
            />
          </Col>
          <Col sm="12" md="8">
            <CustomInput label="De: " value={formData.from}>
              <ReactDatePicker
                selected={formData.from}
                onChange={handleChangeTime("from")}
                showTimeSelect
                showTimeSelectOnly
                // timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
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
                dateFormat="h:mm aa"
                className="form-control"
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
              <Container>
                {props.data.collaborators.map((item) => (
                  <TrainingSessionMember {...item} />
                ))}
              </Container>
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
