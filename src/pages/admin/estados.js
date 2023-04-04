import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import fetcher from "@/services/fetcher";

const States = (props) => {
  return (
    <AdminLayout>
      <DefaultList title="Estados" listId="states" items={props.data} />
    </AdminLayout>
  );
};

States.getInitialProps = async () => {
  const data = await fetcher({
    url: "/state/list",
  }).then((res) => res.data);
  return { data };
};

export default States;
