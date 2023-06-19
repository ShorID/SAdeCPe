import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import withAuthValidation from "@/hocs/withAuthValidation";

const States = (props) => {
  return (
    <AdminLayout>
      <DefaultList title="Estados" listId="states" endpoint="/state" withoutFilters/>
    </AdminLayout>
  );
};

export default withAuthValidation(States);
