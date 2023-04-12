import React from "react";
import PropTypes from "prop-types";
import { getRandomDate } from "@/services/common";
import { Calendar } from "react-multi-date-picker";

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

const items = [
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
  getRandomDate(lastDate, dateEnd),
];

const CustomCalendar = (props) => {
  const [value, onChange] = React.useState(getRandomDate(lastDate, dateEnd));

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        weekDays={weekDays}
        months={months}
        numberOfMonths={2}
        mapDays={({ date }) => {
          if (
            items.some(
              (item) =>
                item.getDay() === date.day &&
                item.getMonth() === date.monthIndex &&
                item.getFullYear() === date.year
            )
          )
            return {
              style: {
                backgroundColor: "gray",
              },
            };
        }}
        showOtherDays
        multiple
      />
    </div>
  );
};

CustomCalendar.propTypes = {};

export default CustomCalendar;
