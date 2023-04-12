import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";

const TrainingSheetPage = (props) => {
  return <AdminLayout>
    <TrainingSheet />
  </AdminLayout>;
};

TrainingSheetPage.propTypes = {};

export default TrainingSheetPage;
