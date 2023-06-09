import React from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import AsyncSelect from "react-select/async";
import fetcher from "@/services/fetcher";
import TitleBlock from "@/components/TitleBlock";

const MyData = (props) => {
  const loadOptions = (inputValue, callback) =>
    fetcher({
      url: "/collaborator/list",
      params: {
        limit: 10,
        search: inputValue,
      },
    }).then(({ data }) => callback(data.data));

  return (
    <Layout>
      <div style={{ minHeight: "600px" }}>
        <TitleBlock title="Ver mis datos" />
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          placeholder="Busca tu registro!"
        />
      </div>
    </Layout>
  );
};

MyData.propTypes = {};

export default MyData;
