import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";

const States = (props) => {
  return (
    <AdminLayout>
      <DefaultList title="Estados" listId="states" endpoint="/state/list" />
    </AdminLayout>
  );
};

export default States;
