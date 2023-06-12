import React from "react";
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
import { getRandomPastelColor } from "@/services/common";
import ChartWrapper from "./ChartWrapper";

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
  const { saveGraph, downloadChart } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  const onFinishGet = (data) =>
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
    });

  const saveGraphRef = React.useCallback(
    (chart) => {
      if (chart.initial) saveGraph(graphId, ref);
    },
    [ref.current]
  );

  return (
    <ChartWrapper
      ready={!!dynamicData}
      onFinishGet={onFinishGet}
      id={graphId}
      onDownload={downloadChart(graphId)}
    >
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
              text: "Comparativa de capaciaciones",
            },
          },
          animation: {
            onComplete: saveGraphRef,
          },
        }}
        data={dynamicData}
        style={{ objectFit: "contain"}}
      />
    </ChartWrapper>
  );
};

ComparisonLastAndCurrentYear.propTypes = {};

export default ComparisonLastAndCurrentYear;
