import React from "react";
import PropTypes from "prop-types";
import List from "../List";
import ListHeader from "../List/ListHeader";
import ListBody from "../List/ListBody";
import ListFooter from "../List/ListFooter";
import TrainingListItem from "./TrainingListItem";
import {
  getRandomAvatar,
  getRandomDate,
  getRandomInt,
  getRandomText,
} from "@/services/common";
import DefaultDataProvider from "../DefaultDataProvider";
import ListSearcher from "../List/ListSearcher";
import moment from "moment";
import ListSelection from "../List/ListSelection";

const getDefaultSessions = () => {
  const arrayWidth = getRandomInt(10);
  const currentDate = new Date();
  let sessions = [];
  const dateEnd = new Date(2024, 1, 1);
  let lastDate = currentDate;
  for (let index = 0; index < arrayWidth; index++) {
    const completed = !!(getRandomInt(2) - 1);
    const sessionDate = getRandomDate(lastDate, dateEnd);
    if (sessionDate > lastDate) lastDate = sessionDate;
    sessions.push({
      date: sessionDate,
      completed,
      description: `Esta sesion ${
        sessionDate < currentDate && !completed ? "no" : ""
      } se ${completed ? "realizó" : "realizará"} el dia ${moment(
        sessionDate
      ).calendar()}`,
      title: `Sesion numero: ${index + 1}`,
    });
  }
  return sessions;
};

const defaultItems = () => {
  const arrayWidth = getRandomInt(20);
  let items = [];
  for (let index = 0; index < arrayWidth; index++) {
    items.push({
      avatar: getRandomAvatar(),
      title: getRandomText({ min: 10, max: 30 }),
      completed: !!(getRandomInt(2) - 1),
      sessions: getDefaultSessions(),
    });
  }
  return items;
};

const TrainingList = (props) => {
  return (
    <List>
      <ListHeader
        title="Capacitaciones"
        subTitle="Lista de capacitaciones"
      ></ListHeader>
      <ListSearcher />
      <ListBody>
        <DefaultDataProvider getDefaultProps={defaultItems}>
          {(data) =>
            Array.isArray(data) &&
            data.map((item) => <TrainingListItem {...item} />)
          }
        </DefaultDataProvider>
      </ListBody>
      <ListFooter>footer</ListFooter>
    </List>
  );
};

TrainingList.propTypes = {};

export default TrainingList;
