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
  const { saveGraph, graphsData } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  React.useEffect(() => {
    fetcher({ url: "/stadistics/comp-year" }).then(({ data }) =>
      setData({
        labels: data.labels,
        datasets: [
          {
            label: "Año pasado",
            data: data.lastYear,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Año actual",
            data: data.currentYear,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      })
    );
  }, []);

  const onClick = () => {
    saveGraph(graphId, ref.current.toBase64Image());
  };

  const downloadChart = () => {
    let link = document.createElement("a");
    link.download = graphId + ".png";
    link.href = graphsData[graphId];
    link.click();
  };

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
              onComplete: function (chart) {
                if (chart.initial)
                  saveGraph(graphId, chart.chart.toBase64Image());
              },
            },
          }}
          onClick={onClick}
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
            display: graphsData[graphId] ? "block" : "none",
          }}
          onClick={downloadChart}
        >
          <Icon name="faDownload" />
        </Button>
      </div>
    )
  );
};

ComparisonLastAndCurrentYear.propTypes = {};

export default ComparisonLastAndCurrentYear;
