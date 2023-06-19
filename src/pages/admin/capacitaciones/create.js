import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";
import withAuthValidation from "@/hocs/withAuthValidation";

const CreateTraining = (props) => {
  return (
    <AdminLayout>
      <TrainingSheet isCreating />
    </AdminLayout>
  );
};

CreateTraining.propTypes = {};

export default withAuthValidation(CreateTraining);
