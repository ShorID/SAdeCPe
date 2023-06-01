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
import { Button } from "reactstrap";
import Icon from "../Icon";

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
  const { saveGraph, graphsData } = React.useContext(ChartContext);
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

  const downloadChart = () => {
    let link = document.createElement("a");
    link.download = graphId + ".png";
    link.href = graphsData[graphId].current.toBase64Image();
    link.click();
  };

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
                text: "Participación en capacitaciones por cargo en este año",
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
          onClick={downloadChart}
        >
          <Icon name="faDownload" />
        </Button>
      </div>
    )
  );
};

MoreQualifiedCharges.propTypes = {};

export default MoreQualifiedCharges;
