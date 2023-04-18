import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const EmployeesPosition = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Cargos"
        listId="employeesPosition"
        endpoint="/employees-position"
        filters="departament"
      />
    </AdminLayout>
  );
};

EmployeesPosition.propTypes = {};

export default EmployeesPosition;
