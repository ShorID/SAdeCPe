import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getRandomColor, getRandomInt } from "@/services/common";
import fetcher from "@/services/fetcher";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["TI", "RRHH", "Tienda", "Bodega", "Contabilidad", "Agentes"],
  datasets: [
    {
      label: "# Capacitaciones",
      data: [
        getRandomInt(20),
        getRandomInt(20),
        getRandomInt(20),
        getRandomInt(20),
        getRandomInt(20),
        getRandomInt(20),
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function PieExample() {
  const [dynamicData, setData] = React.useState();

  React.useEffect(() => {
    fetcher({ url: "/stadistics/cap-dep" }).then(({ data }) =>
      setData(() => {
        let colors =[];
        for (let index = 0; index < data.labels.length; index++) {
          let newColor = getRandomColor();
          if(colors.some((item) => item === newColor)){
            index--
          }else{
            colors.push(newColor)
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

  return dynamicData && <Pie data={dynamicData} />;
}
