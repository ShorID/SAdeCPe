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

TrainingSheetPage.getInitialProps = async ({ asPath, res }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  try {
    const { data } = await fetcher({
      url: "/capacitation/find/" + newId,
    });
    return {
      data: {
        ...data,
        tags: data.tags.map((item) => ({
          ...item,
          tagId: item.tag.id,
          label: item.tag.name,
          value: item.tag.id,
        })),
        sessions: data.sessions.map((item) => {
          const [from, to] = item.schedule.split(" - ");
          return {
            ...item,
            collaborators: item.assistances.map((item) => ({
              ...item.collaborator,
              ...item,
            })),
            dates: item.dates.split(" - ").map((item) => new Date(item)),
            formattedDate: item.dates.split(" - "),
            from,
            to,
          };
        }),
      },
    };
  } catch (e) {
    res.writeHead(302, {
      Location: "/login",
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end();
    return {};
  }
};

export default TrainingSheetPage;
