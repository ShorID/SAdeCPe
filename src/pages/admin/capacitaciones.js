import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import { useRouter } from "next/router";
import withAuthValidation from "@/hocs/withAuthValidation";

const TrainingPage = (props) => {
  const router = useRouter();
  const handleRedirect = () => router.push("/admin/capacitaciones/create");

  return (
    <AdminLayout>
      <DefaultList
        title="Capacitaciones"
        listId="training"
        endpoint="/capacitation"
        onCreate={handleRedirect}
        filters="stateType"
      />
    </AdminLayout>
  );
};

TrainingPage.propTypes = {};

export default withAuthValidation(TrainingPage);
