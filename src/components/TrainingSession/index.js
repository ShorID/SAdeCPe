import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import Text from "../Text";
import { Calendar } from "react-multi-date-picker";
import CustomInput from "../CustomInput";
import drawerTypes from "../Drawers/drawerTypes";
import fetcher from "@/services/fetcher";

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
        <Calendar
          weekDays={weekDays}
          months={months}
          numberOfMonths={3}
          className="mb-3 mx-auto"
          range
          showOtherDays
        />
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
      </CardBody>
    </Card>
  );
};

TrainingSession.propTypes = {
  title: PropTypes.string,
};

export default TrainingSession;
