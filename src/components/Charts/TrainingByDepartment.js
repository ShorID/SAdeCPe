import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getRandomColor } from "@/services/common";
import fetcher from "@/services/fetcher";
import ChartContext from "@/contexts/chart-context";

ChartJS.register(ArcElement, Tooltip, Legend);

const graphId = "trainingByDepartment";

const TrainingByDepartment = (props) => {
  const [dynamicData, setData] = React.useState();
  const { saveGraph } = React.useContext(ChartContext);
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

  return (
    dynamicData && (
      <Pie
        ref={ref}
        options={{
          responsive: true,
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

TrainingByDepartment.propTypes = {};

export default TrainingByDepartment;
