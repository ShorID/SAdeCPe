import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const EmployeesPosition = (props) => {
  console.log("prro", props);
  return (
    <AdminLayout>
      <DefaultList
        title="Cargos"
        listId="employeesPosition"
        endpoint="/employees-position/list"
      />
    </AdminLayout>
  );
};

EmployeesPosition.propTypes = {};

export default EmployeesPosition;
