import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Text from "../Text";
import { Calendar } from "react-multi-date-picker";
import CustomInput from "../CustomInput";
import drawerTypes from "../Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import TrainingSessionMember from "./TrainingSessionMember";
import Collapse from "../Collapse";

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
  const [formData, setFormData] = React.useState({});
  const [centers, setCenters] = React.useState([]);

  const getCenters = () => {
    fetcher({ url: "/center" }).then(({ data }) => setCenters(data));
  };

  React.useEffect(() => {
    getCenters();
  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "center"
          ? centers.find((item) => `${item.id}` === `${value}`)
          : value,
    }));
  };

  return (
    <Card className="my-2">
      <CardHeader>
        <Text>{props.title}</Text>
      </CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col sm="12" md="4">
            <Calendar weekDays={weekDays} months={months} range showOtherDays />
          </Col>
          <Col sm="12" md="8">
            <CustomInput label="Horario: " labelClass="d-block">
              <DateRangePicker
              // value={dates[showingItem].date}
              // className="d-block w-auto"
              />
            </CustomInput>
            <CustomInput label="Duracion:" labelClass="d-block">
              <TimeRangePicker
              // value={dates[showingItem].timeRange}
              // onChange={handleTimeRange(showingItem)}
              // className="d-block w-auto"
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
          </Col>
        </Row>
        <Collapse
          className="TrainingSession-members"
          header={
            <Text className="w-100" TagName="div">
              Participantes
            </Text>
          }
        >
          <TrainingSessionMember />
        </Collapse>
      </CardBody>
    </Card>
  );
};

TrainingSession.propTypes = {
  title: PropTypes.string,
};

export default TrainingSession;
