import React from "react";
import PropTypes from "prop-types";
import List from "../List";
import ListHeader from "../List/ListHeader";
import ListBody from "../List/ListBody";
import ListFooter from "../List/ListFooter";
import TrainingListItem from "./TrainingListItem";

const TrainingList = (props) => {
  return (
    <List>
      {(ctx) => {
        return (
          <>
            <ListHeader
              title="Capacitaciones"
              subTitle="Lista de capacitaciones"
            >
            </ListHeader>
            <ListBody>
              <TrainingListItem  />
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
