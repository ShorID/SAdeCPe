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
  filters,
  withoutFilters = false,
  withoutEdit = false,
  withoutDelete = false,
  withoutCheck = false,
  onCreate,
  onSelect,
}) => {
  const RowComponent = rowsTypes[listId];
  return (
    <List formId={formId || listId} endpoint={endpoint} onSelect={onSelect}>
      <ListHeader title={title} onCreate={onCreate}></ListHeader>
      <ListSearcher filters={filters} withoutFilters={withoutFilters} />
      <ListBody>
        <ListContext.Consumer>
          {({ listItems }) =>
            Array.isArray(listItems?.data) &&
            RowComponent &&
            listItems.data.map((item, key) => (
              <RowComponent
                key={key}
                withoutEdit={withoutEdit}
                withoutDelete={withoutDelete}
                withoutCheck={withoutCheck}
                {...item}
              />
            ))
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
  filters: PropTypes.string,
  items: PropTypes.array,
  withoutFilters: PropTypes.bool,
  onCreate: PropTypes.func,
  onSelect: PropTypes.func,
  withoutEdit: PropTypes.bool,
  withoutDelete: PropTypes.bool,
  withoutCheck: PropTypes.bool,
};

export default DefaultList;
