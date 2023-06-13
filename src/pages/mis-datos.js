import React from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import AsyncSelect from "react-select/async";
import fetcher from "@/services/fetcher";
import TitleBlock from "@/components/TitleBlock";
import EmployeeStatusSheet from "@/components/EmployeeStatusSheet";

const MyData = (props) => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const getData = async (id) => {
    setLoading(true);
    const { data } = await fetcher({
      url: "/home/collaborator/findOne/" + id,
    });
    const { data: trainingData } = await fetcher({
      url: "/home/info-cap-col/" + id,
    });
    setData({
      ...data,
      departamentId: data.position.departamentId,
      trainingData,
    });
    setLoading(false);
  };

  const loadOptions = (inputValue, callback) =>
    fetcher({
      url: "/home/collaborator",
      params: {
        limit: 10,
        search: inputValue,
      },
    }).then(({ data }) =>
      callback(
        Array.isArray(data.data)
          ? data.data.map((item) => ({
              ...item,
              label: `${item.name} ${item.lastName} #${item.position.name}`,
              value: item.id,
            }))
          : []
      )
    );

  const handleSelect = (e) => getData(e.id);

  return (
    <Layout>
      <div style={{ minHeight: "600px" }}>
        <TitleBlock title="Ver mis datos" />
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          placeholder="Busca tu registro!"
          onChange={handleSelect}
          className="mb-2"
        />
        {data && !loading && <EmployeeStatusSheet {...props} data={data} />}
      </div>
    </Layout>
  );
};

MyData.propTypes = {};

export default MyData;
