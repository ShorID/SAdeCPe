import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import EmployeeSheet from "@/components/EmployeeSheet";

const CraetingEmployee = (props) => {
  return (
    <AdminLayout>
      <EmployeeSheet isCreating />
    </AdminLayout>
  );
};

CraetingEmployee.propTypes = {};

export default CraetingEmployee;
