import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getRandomPastelColor } from "@/services/common";
import ChartContext from "@/contexts/chart-context";
import ChartWrapper from "./ChartWrapper";

ChartJS.register(ArcElement, Tooltip, Legend);

const graphId = "trainingByDepartment";

const TrainingByDepartment = (props) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph, downloadChart } = React.useContext(ChartContext);
  const ref = React.useRef(null);

  const onFinishGet = (data) =>
    setData(() => {
      let colors = [];
      for (let index = 0; index < data.labels.length; index++) {
        let newColor = getRandomPastelColor();
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
            data: data.data,
            backgroundColor: colors,
            borderColor: colors,
          },
        ],
      };
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
      <Pie
        ref={ref}
        options={{
          responsive: true,
          elements: {
            line: {
              borderWidth: 3
            }
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

TrainingByDepartment.propTypes = {};

export default TrainingByDepartment;
