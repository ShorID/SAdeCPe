import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const ReasonsForExemption = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Razones de Exoneración"
        listId="exemptionReasons"
        endpoint="/reason"
        withoutFilters
      />
    </AdminLayout>
  );
};

ReasonsForExemption.propTypes = {};

export default ReasonsForExemption;
