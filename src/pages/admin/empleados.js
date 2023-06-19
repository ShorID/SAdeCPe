import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import { useRouter } from "next/router";
import withAuthValidation from "@/hocs/withAuthValidation";

const Employees = (props) => {
  const router = useRouter();

  const handleRedirect = () => router.push("/admin/empleados/crear");

  return (
    <AdminLayout>
      <DefaultList
        title="Empleados"
        endpoint="/collaborator"
        listId="employees"
        filters="employeePos,departament"
        onCreate={handleRedirect}
      />
    </AdminLayout>
  );
};

Employees.propTypes = {};

export default withAuthValidation(Employees);
