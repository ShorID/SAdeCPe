import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";
import ListContext from "@/contexts/list-context";
import classNames from "classnames";

const List = (props) => {
  return (
    <Card className={classNames("List",props.className)}>
      <ListContext.Consumer>
        {(ctx) =>
          typeof props.children === "function"
            ? props.children(ctx)
            : props.children
        }
      </ListContext.Consumer>
    </Card>
  );
};

List.propTypes = {
  className: PropTypes.string
};

export default List;
