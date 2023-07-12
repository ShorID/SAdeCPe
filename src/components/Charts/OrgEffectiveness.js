import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

import ChartContext from "@/contexts/chart-context";
import ChartWrapper from "./ChartWrapper";
import { getRandomPastelColor } from "@/services/common";

const graphId = "orgEffectiveness";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.5)',
//         'rgba(54, 162, 235, 0.5)',
//         'rgba(255, 206, 86, 0.5)',
//         'rgba(75, 192, 192, 0.5)',
//         'rgba(153, 102, 255, 0.5)',
//         'rgba(255, 159, 64, 0.5)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const OrgEffectiveness = (props) => {
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
            data: data.effective,
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
      <PolarArea
        ref={ref}
        options={{
          responsive: true,
          elements: {
            line: {
              borderWidth: 3,
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

OrgEffectiveness.propTypes = {};

export default OrgEffectiveness;
