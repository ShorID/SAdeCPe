import React from "react";
import PropTypes from "prop-types";
import { getRandomDate, getRandomInt } from "@/services/common";
import ScheduleBadge from "./ScheduleBadge";
import DefaultDataProvider from "../DefaultDataProvider";

const getDefaultSessions = () => {
  const arrayWidth = getRandomInt(10);
  const [dateStart, dateEnd] = [new Date(), new Date(2024, 1, 1)];
  let sessions = [];
  for (let index = 0; index < arrayWidth; index++) {
    sessions.push({
      date: getRandomDate(dateStart, dateEnd),
      completed: !!(getRandomInt(2) - 1),
      description: "",
      title: "",
    });
  }
  return { sessions };
};

const ScheduleBadges = (props) => {
  return (
    <div className="ScheduleBadges">
      <DefaultDataProvider getDefaultProps={getDefaultSessions}>
        {(props) =>
          Array.isArray(props.sessions) &&
          props.sessions.map((item, i) => <ScheduleBadge {...item} key={i} />)
        }
      </DefaultDataProvider>
    </div>
  );
};

ScheduleBadges.propTypes = {
  sessions: PropTypes.array,
  trainingTitle: PropTypes.string,
};

export default ScheduleBadges;
