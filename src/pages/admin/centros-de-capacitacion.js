import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import withAuthValidation from "@/hocs/withAuthValidation";

const TrainingCenters = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Centros de capacitacion"
        listId="trainingCenter"
        endpoint="/center"
        withoutFilters
      />
    </AdminLayout>
  );
};

TrainingCenters.propTypes = {};

export default withAuthValidation(TrainingCenters);
