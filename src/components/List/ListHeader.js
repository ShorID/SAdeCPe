import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CardBody, CardTitle, Spinner } from "reactstrap";
import SortBy from "../SortBy";
import ListOptions from "./ListOptions";
import Text from "../Text";
import Icon from "../Icon";
import ListContext from "@/contexts/list-context";

const ListHeader = (props) => {
  const listContext = useContext(ListContext);

  return (
    <CardBody className="List-header">
      <CardTitle tag="div" className="List-title">
        <Text className="mr-1">{props.title}</Text>
        {listContext.isLoading && (
          <Spinner color="primary" size="sm" className="mx-1">
            Loading...
          </Spinner>
        )}
      </CardTitle>
      <div className="List-headerOptions">
        <Icon />
        <SortBy
          onChange={({ target: { value } }) => listContext.handleSortBy(value)}
        />
        <ListOptions />
      </div>
    </CardBody>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ListHeader;
