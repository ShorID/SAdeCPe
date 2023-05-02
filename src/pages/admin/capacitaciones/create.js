import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";

const CreateTraining = (props) => {
  console.log("prro", props)
  return (
    <AdminLayout>
      <TrainingSheet isCreating />
    </AdminLayout>
  );
};

CreateTraining.propTypes = {};

export default CreateTraining;
