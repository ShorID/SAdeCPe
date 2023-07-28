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
import { Button, Col, Row } from "reactstrap";
import EmployeeSelector from "../EmployeeSelector";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import drawerTypes from "../Drawers/drawerTypes";

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
  const [centers, setCenters] = React.useState([]);
  const [showingItem, setShowingItem] = React.useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  const handleAdd = (clickedDate) => {
    // setDate(clickedDate);
    setDates((prev) => [
      ...prev,
      {
        date: ["12/12/2023", "12/13/2023"],
        formatted: ``,
        center: centers[0] ?? {},
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

  const showItem = (itemIdx) => () => setShowingItem(itemIdx);

  return (
    <div>
      <Text
        TagName="h6"
        className="Form-title"
        text="Añade las sesiones que tendra tu capacitacion!"
      />
      {/* <Calendar
        onChange={handleAdd}
        value={date}
        weekDays={weekDays}
        months={months}
        numberOfMonths={3}
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
        className="mx-auto mb-3"
        showOtherDays
      /> */}
      <Row>
        <Col sm="12" md="5">
          <div className="CustomCalendar-sessions">
            {Array.isArray(dates) &&
              dates.map((item, key) => (
                // <Collapse
                //   key={key + item.date.day}
                //   header={
                //     <div>
                //       <Text bold text={`Sesion ${key + 1}:`} />
                //       <Text className="mx-2">{`${item.date.day}/${item.date.monthIndex}/${item.date.year}`}</Text>
                //       <Text>
                //         {item.timeRange
                //           ? `- ${item.timeRange[0]} - ${item.timeRange[1]} -`
                //           : "- Sin duracion -"}
                //       </Text>
                //       <Text>
                //         {item.center ? `- ${item.center?.name} -` : "- Sin lugar -"}
                //       </Text>
                //     </div>
                //   }
                //   className="CustomCalendar-session"
                //   contentClass="CustomCalendar-sessionContent"
                // >

                // </Collapse>
                <Clickable
                  onClick={showItem(key)}
                  className="CustomCalendar-session"
                  key={key + item.date.day}
                >
                  <Text bold text={`Sesion ${key + 1}:`} />
                  <Text className="mx-2">{`${item.date.day}/${item.date.monthIndex}/${item.date.year}`}</Text>
                  {/* <Text>
                    {item.timeRange
                      ? `- ${item.timeRange[0]} - ${item.timeRange[1]} -`
                      : "- Sin duracion -"}
                  </Text>
                  <Text>
                    {item.center ? `- ${item.center?.name} -` : "- Sin lugar -"}
                  </Text> */}
                </Clickable>
              ))}
            <Button
              color="warning"
              className="w-100 my-2"
              type="button"
              onClick={handleAdd}
            >
              Añadir Sesion
            </Button>
          </div>
        </Col>
        <Col sm="12" md="7">
          {dates && dates[showingItem] ? (
            <div className="CustomCalendar-sessionContent" key={showingItem}>
              <Text bold text={`Sesion ${showingItem + 1}`} />
              <CustomInput label="Horario: ">
                <DateRangePicker
                  value={dates[showingItem].date}
                  className="d-block w-auto"
                />
              </CustomInput>
              <CustomInput label="Duracion: ">
                <TimeRangePicker
                  value={dates[showingItem].timeRange}
                  onChange={handleTimeRange(showingItem)}
                  className="d-block w-auto"
                />
              </CustomInput>
              <CustomInput
                label="Centro de capacitacion"
                type="select"
                onChange={handleChange(showingItem)}
                name="center"
                value={dates[showingItem].center?.id}
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
              <div className="CustomCalendar-sessionAction">
                <Clickable
                  className="ml-auto d-flex"
                  onClick={handleClick(showingItem)}
                >
                  <Icon name="faTrash" />
                </Clickable>
              </div>
            </div>
          ) : (
            <Text className="mx-auto" TagName="span">
              No has agregado ninguna sesion!
            </Text>
          )}
        </Col>
      </Row>
    </div>
  );
};

CustomCalendar.propTypes = {
  onChange: PropTypes.func,
};

export default CustomCalendar;
