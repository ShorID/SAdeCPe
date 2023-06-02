import React from "react";
import PropTypes from "prop-types";
import fetcher from "@/services/fetcher";
import { Bar } from "react-chartjs-2";
import ChartContext from "@/contexts/chart-context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "reactstrap";
import Icon from "../Icon";
import { getRandomPastelColor } from "@/services/common";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const graphId = "comparisonLastAndCurrentYear";

const ComparisonLastAndCurrentYear = (props) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph, graphsData, downloadChart } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  React.useEffect(() => {
    fetcher({ url: "/stadistics/comp-year" }).then(({ data }) =>
      setData({
        labels: data.labels,
        datasets: [
          {
            label: "Año pasado",
            data: data.lastYear,
            backgroundColor: getRandomPastelColor(),
          },
          {
            label: "Año actual",
            data: data.currentYear,
            backgroundColor: getRandomPastelColor(),
          },
        ],
      })
    );
  }, []);

  const saveGraphRef = React.useCallback(
    (chart) => {
      if (chart.initial) saveGraph(graphId, ref);
    },
    [ref.current]
  );

  return (
    dynamicData && (
      <div style={{ position: "relative" }}>
        <Bar
          ref={ref}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Comparativa de capaciaciones Enero-Julio",
              },
            },
            animation: {
              onComplete: saveGraphRef,
            },
          }}
          data={dynamicData}
        />
        <Button
          size="sm"
          color="success"
          type="button"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: graphsData[graphId]?.current ? "block" : "none",
          }}
          onClick={downloadChart(graphId)}
        >
          <Icon name="faDownload" />
        </Button>
      </div>
    )
  );
};

ComparisonLastAndCurrentYear.propTypes = {};

export default ComparisonLastAndCurrentYear;
