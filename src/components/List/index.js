import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";
import { ListProvider } from "@/contexts/list-context";
import classNames from "classnames";

const List = (props) => {
  return (
    <Card className={classNames("List", props.className)}>
      <ListProvider formId={props.formId}>
        <>{props.children}</>
      </ListProvider>
    </Card>
  );
};

List.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
};

export default List;
