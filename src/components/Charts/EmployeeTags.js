import React from "react";
import PropTypes from "prop-types";
import ChartContext from "@/contexts/chart-context";
import ChartWrapper from "./ChartWrapper";
import { chartEndpoints } from "./chartsEndpoints";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const graphId = "employeeTags";

const EmployeeTags = ({ id = "" }) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph, downloadChart } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  const onFinishGet = (data) =>
    setData({
      labels: data.labels,
      datasets: [
        {
          label: "# de temas",
          data: data.points,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

  const saveGraphRef = React.useCallback(
    (chart) => {
      if (chart.initial) saveGraph(graphId + id, ref);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current]
  );

  return (
    <ChartWrapper
      ready={!!dynamicData}
      onFinishGet={onFinishGet}
      id={graphId + id}
      endpoint={chartEndpoints["employeeTags"] + id}
      onDownload={downloadChart(graphId + id)}
    >
      <Radar
        ref={ref}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scale: {
            ticks: {
              beginAtZero: true,
            },
          },
          animation: {
            onComplete: saveGraphRef,
          },
        }}
        data={dynamicData}
      />
    </ChartWrapper>
  );
};

EmployeeTags.propTypes = {
  id: PropTypes.string.isRequired,
};

EmployeeTags.graphId = graphId;

export default EmployeeTags;
