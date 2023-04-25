import React from "react";
import PropTypes from "prop-types";
import { getRandomDate } from "@/services/common";
import { Calendar } from "react-multi-date-picker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import Text from "../Text";
import Collapse from "../Collapse";
import Clickable from "../Clickable";
import Icon from "../Icon";
import fetcher from "@/services/fetcher";
import CustomInput from "../CustomInput";

const lastDate = new Date(2023, 4, 30);
const dateEnd = new Date();

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

const ocupedDates = [
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
];

const CustomCalendar = (props) => {
  const [dates, setDates] = React.useState([]);
  const [date, setDate] = React.useState();
  const [centers, setCenters] = React.useState();
  const changeRef = React.useRef(null);

  const getCenters = () => {
    fetcher({ url: "/center" }).then(({ data }) => setCenters(data));
  };

  React.useEffect(() => {
    getCenters();
  }, []);

  React.useEffect(() => {
    clearTimeout(changeRef.current);
    changeRef.current = setTimeout(
      () => props.onChange && props.onChange(dates),
      1000
    );
    return () => clearTimeout(changeRef.current);
  }, [dates]);

  const handleSelect = (clickedDate) => {
    setDate(clickedDate);
    setDates((prev) => [
      ...prev,
      {
        date: clickedDate,
        formatted: `${clickedDate.day}/${clickedDate.monthIndex}/${clickedDate.year}`,
        center: centers[0],
        timeRange: ["13:00", "14:00"],
      },
    ]);
  };

  const handleClick = (idx) => () => {
    setDate(null);
    setDates((prev) => prev.filter((__, key) => key !== idx));
  };

  const handleChange =
    (idx) =>
    ({ target: { value, name } }) => {
      setDates((prev) =>
        prev.map((item, key) =>
          key === idx
            ? {
                ...item,
                [name]:
                  name === "center"
                    ? centers.find((item) => `${item.id}` === `${value}`)
                    : value,
              }
            : item
        )
      );
    };

  const handleTimeRange = (idx) => (value) => {
    setDates((prev) =>
      prev.map((item, key) =>
        key === idx ? { ...item, timeRange: value } : item
      )
    );
  };

  return (
    <div>
      <Text
        TagName="h6"
        className="CustomCalendar-title"
        text="Selecciona las sesiones que tendra tu capacitacion!"
      />
      <div className="row">
        <div className="col-4">
          <Calendar
            onChange={handleSelect}
            value={date}
            weekDays={weekDays}
            months={months}
            mapDays={({ date }) => {
              if (
                dates.some(
                  (item) =>
                    item.date.day === date.day &&
                    item.date.monthIndex === date.monthIndex &&
                    item.date.year === date.year
                )
              )
                return {
                  style: {
                    backgroundColor: "lightgreen",
                    color: "black",
                  },
                };
              if (
                ocupedDates.some(
                  (item) =>
                    item.getDay() === date.day &&
                    item.getMonth() === date.monthIndex &&
                    item.getFullYear() === date.year
                )
              )
                return {
                  className: "CustomCalendar-ocuped",
                };
            }}
            showOtherDays
          />
        </div>
        <div className="col-8 d-flex flex-column">
          <Text bold>Sesiones Añadidas:</Text>
          <div className="CustomCalendar-sessions">
            {Array.isArray(dates) &&
              dates.map((item, key) => (
                <Collapse
                  key={key + item.date.day}
                  header={
                    <div>
                      <Text bold text={`Sesion ${key + 1}:`} />
                      <Text className="mx-2">{`${item.date.day}/${item.date.monthIndex}/${item.date.year}`}</Text>
                      <Text>
                        {item.timeRange
                          ? `- ${item.timeRange[0]} - ${item.timeRange[1]} -`
                          : "- Sin duracion -"}
                      </Text>
                      <Text>
                        {item.center
                          ? `- ${item.center?.name} -`
                          : "- Sin lugar -"}
                      </Text>
                    </div>
                  }
                  className="CustomCalendar-session"
                  contentClass="CustomCalendar-sessionContent"
                >
                  <Text className="mr-1">Duracion: </Text>
                  <TimeRangePicker
                    className="mb-2"
                    value={item.timeRange}
                    onChange={handleTimeRange(key)}
                  />
                  <CustomInput
                    label="Centro de capacitacion"
                    type="select"
                    onChange={handleChange(key)}
                    name="center"
                    value={item.center?.id}
                  >
                    {Array.isArray(centers) &&
                      centers.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </CustomInput>
                  <div className="CustomCalendar-sessionAction">
                    <Clickable
                      className="ml-auto d-flex"
                      onClick={handleClick(key)}
                    >
                      <Icon name="faTrash" />
                    </Clickable>
                  </div>
                </Collapse>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomCalendar.propTypes = {
  onChange: PropTypes.func,
};

export default CustomCalendar;
