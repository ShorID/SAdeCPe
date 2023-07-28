import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import TrainingSheet from "@/components/TrainingSheet";
import fetcher from "@/services/fetcher";
import withAuthValidation from "@/hocs/withAuthValidation";

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
          const [startTimeString, endTimeString] = item.schedule.split(" - ");
          const currentDate = new Date();
          const from = new Date(currentDate.toDateString() + " " + startTimeString);
          const to = new Date(currentDate.toDateString() + " " + endTimeString);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default withAuthValidation(TrainingSheetPage);
