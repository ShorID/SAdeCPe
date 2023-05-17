import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";
import fetcher from "@/services/fetcher";
import moment from "moment";

const TrainingSheetPage = (props) => {
  console.log("prro", props);
  return (
    <AdminLayout>
      <TrainingSheet data={props.data} />
    </AdminLayout>
  );
};

TrainingSheetPage.getInitialProps = async ({ asPath }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  const { data } = await fetcher({
    url: "/capacitation/find/" + newId,
  });

  return {
    data: {
      ...data,
      tags: data.tags.map((item) => ({
        ...item,
        label: item.tag.name,
        value: item.tag.id,
      })),
      sessions: data.sessions.map((item) => ({
        ...item,
        collaborators: item.assistances.map((item) => ({
          ...item.collaborator,
          ...item,
        })),
        datesPP: item.dates.split(" - "),
      })),
    },
  };
};

export default TrainingSheetPage;
