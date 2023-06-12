import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import fetcher from "@/services/fetcher";
import EmployeeStatusSheet from "@/components/EmployeeStatusSheet";

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

export default EmployeeStatusPage;
