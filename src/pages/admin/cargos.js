import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import fetcher from "@/services/fetcher";

const EmployeesPosition = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Cargos"
        listId="employeesPosition"
        items={props.data.data}
      />
    </AdminLayout>
  );
};

EmployeesPosition.propTypes = {};

EmployeesPosition.getInitialProps = async () => {
  const data = await fetcher({
    url: "/employees-position/list",
  }).then((res) => res.data);
  return { data };
};

export default EmployeesPosition;
