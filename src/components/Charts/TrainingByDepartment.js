import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getRandomColor } from "@/services/common";
import fetcher from "@/services/fetcher";
import ChartContext from "@/contexts/chart-context";
import { Button } from "reactstrap";
import Icon from "../Icon";

ChartJS.register(ArcElement, Tooltip, Legend);

const graphId = "trainingByDepartment";

const TrainingByDepartment = (props) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph, graphsData } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  React.useEffect(() => {
    fetcher({ url: "/stadistics/cap-dep" }).then(({ data }) =>
      setData(() => {
        let colors = [];
        for (let index = 0; index < data.labels.length; index++) {
          let newColor = getRandomColor();
          if (colors.some((item) => item === newColor)) {
            index--;
          } else {
            colors.push(newColor);
          }
        }
        return {
          labels: data.labels,
          datasets: [
            {
              label: "# Capacitaciones",
              data: data.data,
              backgroundColor: colors,
              borderColor: colors,
            },
          ],
        };
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
        <Pie
          ref={ref}
          options={{
            responsive: true,
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
            top: -10,
            right: -10,
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

TrainingByDepartment.propTypes = {};

export default TrainingByDepartment;
