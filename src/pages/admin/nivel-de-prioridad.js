import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const PriorityLevel = (props) => {

  return (
    <AdminLayout>
      <DefaultList title="Niveles de Prioridad" listId="priorityLevel" endpoint="/priority" withoutFilters />
    </AdminLayout>
  );
};

PriorityLevel.propTypes = {};

export default PriorityLevel;
