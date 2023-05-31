import React from "react";
import PropTypes from "prop-types";
import fetcher from "@/services/fetcher";

const ChartDataProvider = (props) => {
  const [dynamicData, setData] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState();

  const getChartData = async () => {
    setIsLoading(true);
    fetcher({ url: "/stadistics/comp-year" }).then(({ data }) => {
      setData(data);
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    getChartData();
  }, []);

  const Chart = props.children;

  return (
    <div>
      {isLoading ? (
        <Spinner color="primary" size="sm" className="mx-1">
          Cargando datos del grafico...
        </Spinner>
      ) : (
        <Chart  />
      )}
    </div>
  );
};

ChartDataProvider.propTypes = {};

export default ChartDataProvider;
