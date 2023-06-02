import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import fetcher from "@/services/fetcher";
import EmployeeStatusSheet from "@/components/EmployeeStatusSheet";

const EmployeeStatusPage = (props) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetcher({
      url: "/collaborator/findOne/" + props.id,
    }).then(({ data }) =>
      setData({
        ...data,
        departamentId: data.position.departamentId,
      })
    );
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
