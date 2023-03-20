import React from "react";
import PropTypes from "prop-types";
import List from "../List";
import ListHeader from "../List/ListHeader";
import DefaultDataProvider from "../DefaultDataProvider";
import TrainingListItem from "../TrainingList/TrainingListItem";
import ListFooter from "../List/ListFooter";
import CustomPagination from "../Pagination";
import ListSearcher from "../List/ListSearcher";
import ListBody from "../List/ListBody";
import { getRandomAvatar, getRandomInt, getRandomText } from "@/services/common";

const defaultItems = () => {
  const arrayWidth = getRandomInt(20);
  let items = [];
  for (let index = 0; index < arrayWidth; index++) {
    items.push({
      avatar: getRandomAvatar(),
      title: getRandomText({ min: 10, max: 30 }),
      completed: !!(getRandomInt(2) - 1),
    });
  }
  return items;
};

const DefaultList = ({ title = "", getDefaultProps = () => [] }) => {
  return (
    <List>
      <ListHeader title={title}></ListHeader>
      <ListSearcher />
      <ListBody>
        <DefaultDataProvider getDefaultProps={defaultItems}>
          {(data) =>
            Array.isArray(data) &&
            data.map((item) => <TrainingListItem {...item} />)
          }
        </DefaultDataProvider>
      </ListBody>
      <ListFooter>
        <CustomPagination />
      </ListFooter>
    </List>
  );
};

DefaultList.propTypes = {};

export default DefaultList;
