import React from "react";
import PropTypes from "prop-types";
import List from "../List";
import ListHeader from "../List/ListHeader";
import ListBody from "../List/ListBody";
import ListFooter from "../List/ListFooter";
import TrainingListItem from "./TrainingListItem";
import {
  getRandomAvatar,
  getRandomInt,
  getRandomText,
} from "@/services/common";
import DefaultDataProvider from "../DefaultDataProvider";

const defaultItems = () => {
  const arrayWidth = getRandomInt(20);
  let items = [];
  for (let index = 0; index < arrayWidth; index++) {
    items.push({
      avatar: getRandomAvatar(),
      title: getRandomText({words: 10, min: 10, max: 10}),
      completed: !!(getRandomInt(2) - 1),
    });
  }
  return items;
};

const TrainingList = (props) => {
  return (
    <List>
      {(ctx) => {
        return (
          <>
            <ListHeader
              title="Capacitaciones"
              subTitle="Lista de capacitaciones"
            ></ListHeader>
            <ListBody>
              <DefaultDataProvider getDefaultProps={defaultItems}>
                {(data) =>
                  Array.isArray(data) &&
                  data.map((item) => <TrainingListItem {...item} />)
                }
              </DefaultDataProvider>
            </ListBody>
            <ListFooter>prueba</ListFooter>
          </>
        );
      }}
    </List>
  );
};

TrainingList.propTypes = {};

export default TrainingList;
