import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import EmployeeSheet from "@/components/EmployeeSheet";
import fetcher from "@/services/fetcher";

const EmployeesPage = (props) => {
  return (
    <AdminLayout>
      <EmployeeSheet {...props} />
    </AdminLayout>
  );
};

EmployeesPage.propTypes = {};

EmployeesPage.getInitialProps = async ({ asPath }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  const data = await fetcher({
    url: "/collaborator/findOne/" + newId,
  }).then(({ data }) => ({
    ...data,
    departamentId: data.position.departamentId,
  }));

  return { data };
};

export default EmployeesPage;
