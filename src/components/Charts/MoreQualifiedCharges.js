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
import { getRandomColor } from "@/services/common";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const graphId = "moreQualifiedCharges";

const MoreQualifiedCharges = (props) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  React.useEffect(() => {
    fetcher({ url: "/stadistics/cap-schedule" }).then(({ data }) =>
      setData({
        labels: data.labels,
        datasets: [
          {
            label: "Capacitaciones",
            data: data.countSessions,
            backgroundColor: getRandomColor(),
          },
        ],
      })
    );
  }, []);

  return (
    dynamicData && (
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
              text: "Participación en capacitaciones por cargo en este año",
            },
          },
          animation: {
            onComplete: function (chart) {
              if (chart.initial)
                saveGraph(graphId, chart.chart.toBase64Image());
            },
          },
        }}
        data={dynamicData}
      />
    )
  );
};

MoreQualifiedCharges.propTypes = {};

export default MoreQualifiedCharges;
