import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const Requests = (props) => {
  return (
    <AdminLayout>
      <DefaultList title="Solicitudes" />
    </AdminLayout>
  );
};

Requests.propTypes = {};

export default Requests;
