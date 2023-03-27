import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import axios from "axios";

const Schedules = (props) => {
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(
      "https://0085-2803-2d60-1102-1dc2-b047-3c5f-91aa-5bdc.ngrok.io/departament/all",
    );
    console.log("prro", data);
  };

  return (
    <AdminLayout>
      <DefaultList title="Horarios" listId="schedules" />
    </AdminLayout>
  );
};

Schedules.propTypes = {};

export default Schedules;
