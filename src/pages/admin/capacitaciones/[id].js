import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";
import fetcher from "@/services/fetcher";
import moment from "moment";

const TrainingSheetPage = (props) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetcher({
      url: "/capacitation/find/" + props.id,
    }).then(({ data }) =>
      setData({
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
      })
    );
  }, []);
  return <AdminLayout>{data && <TrainingSheet data={data} />}</AdminLayout>;
};

TrainingSheetPage.getInitialProps = async ({ asPath }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  // try {

  // } catch (e) {
  //   res.writeHead(302, {
  //     Location: "/login",
  //     "Content-Type": "text/html; charset=utf-8",
  //   });
  //   res.end();
  //   return {};
  // }
  return { id: newId };
};

export default TrainingSheetPage;
