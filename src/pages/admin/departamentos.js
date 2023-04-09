import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const Departments = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Departamentos"
        listId="departments"
        endpoint="/departament/list"
      />
    </AdminLayout>
  );
};

Departments.propTypes = {};

export default Departments;
