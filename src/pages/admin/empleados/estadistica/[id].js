import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import fetcher from "@/services/fetcher";
import EmployeeStatusSheet from "@/components/EmployeeStatusSheet";
import withAuthValidation from "@/hocs/withAuthValidation";

const EmployeeStatusPage = (props) => {
  const [data, setData] = React.useState();

  const getData = async () => {
    const { data } = await fetcher({
      url: "/collaborator/findOne/" + props.id,
    });
    const { data: trainingData } = await fetcher({
      url: "/stadistics/info-cap-col/" + props.id,
    });
    setData({
      ...data,
      departamentId: data.position.departamentId,
      trainingData,
    });
  };

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      {data && <EmployeeStatusSheet {...props} data={data} />}
    </AdminLayout>
  );
};

EmployeeStatusPage.propTypes = {};

EmployeeStatusPage.getInitialProps = async ({ asPath }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  return { id: newId };
};

export default withAuthValidation(EmployeeStatusPage);
