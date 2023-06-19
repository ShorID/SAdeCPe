import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import EmployeeSheet from "@/components/EmployeeSheet";
import fetcher from "@/services/fetcher";
import withAuthValidation from "@/hocs/withAuthValidation";

const EmployeesPage = (props) => {
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
      {data && <EmployeeSheet {...props} data={data} />}
    </AdminLayout>
  );
};

EmployeesPage.propTypes = {};

EmployeesPage.getInitialProps = async ({ asPath }) => {
  const arrayFromQuery = asPath.split("/");
  const newId = +arrayFromQuery.find(Number);
  return { id: newId };
};

export default withAuthValidation(EmployeesPage);
