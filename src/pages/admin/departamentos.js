import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import fetcher from "@/services/fetcher";

const Departments = (props) => {
  return (
    <AdminLayout>
      <DefaultList
        title="Departamentos"
        listId="departments"
        items={props.data}
      />
    </AdminLayout>
  );
};

Departments.propTypes = {};

Departments.getInitialProps = async () => {
  const data = await fetcher({
    url: "/departament/list",
  }).then((res) => res.data);
  return { data };
};

export default Departments;
