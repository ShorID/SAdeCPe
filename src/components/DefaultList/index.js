import React from "react";
import PropTypes from "prop-types";
import List from "../List";
import ListHeader from "../List/ListHeader";
import DefaultDataProvider from "../DefaultDataProvider";
import ListFooter from "../List/ListFooter";
import CustomPagination from "../Pagination";
import ListSearcher from "../List/ListSearcher";
import ListBody from "../List/ListBody";
import {
  getRandomAvatar,
  getRandomInt,
  getRandomText,
} from "@/services/common";
import rowsTypes from "./rowsTypes";
import ListContext from "@/contexts/list-context";

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

const DefaultList = ({
  title = "",
  listId = "training",
  formId,
  getDefaultItems,
  endpoint,
  skipFilters,
  withoutFilters = false,
}) => {
  const RowComponent = rowsTypes[listId];
  return (
    <List formId={formId || listId} endpoint={endpoint}>
      <ListHeader title={title}></ListHeader>
      <ListSearcher skipFilters={skipFilters} withoutFilters={withoutFilters} />
      <ListBody>
        <ListContext.Consumer>
          {({ listItems }) =>
            Array.isArray(listItems?.data) ? (
              RowComponent &&
              listItems.data.map((item, key) => (
                <RowComponent key={key} {...item} />
              ))
            ) : (
              <DefaultDataProvider
                getDefaultProps={getDefaultItems || defaultItems}
              >
                {(data) =>
                  Array.isArray(data) &&
                  RowComponent &&
                  data.map((item, key) => <RowComponent key={key} {...item} />)
                }
              </DefaultDataProvider>
            )
          }
        </ListContext.Consumer>
      </ListBody>
      <ListFooter>
        <CustomPagination />
      </ListFooter>
    </List>
  );
};

DefaultList.propTypes = {
  getDefaultItems: PropTypes.func,
  formId: PropTypes.string,
  listId: PropTypes.string,
  endpoint: PropTypes.string,
  skipFilters: PropTypes.string,
  items: PropTypes.array,
  withoutFilters: PropTypes.bool,
};

export default DefaultList;
