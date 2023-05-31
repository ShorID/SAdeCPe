import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getRandomInt } from "@/services/common";
import fetcher from "@/services/fetcher";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
};

export const optionsposition = {
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
};

const labelsPosition = [
  "Auxiliar de TI",
  "Gerente RRHH",
  "Gerente TI",
  "Agente",
  "Contador",
];
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
  labels,
  datasets: [
    {
      label: "Año pasado",
      data: labels.map(() => getRandomInt(30)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Año actual",
      data: labels.map(() => getRandomInt(30)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export const dataPosition = {
  labels: labelsPosition,
  datasets: [
    {
      label: "Capacitaciones",
      data: labels.map(() => getRandomInt(30)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function VerticalBarExample(props) {
  const [dynamicData, setData] = React.useState();
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

  console.log("prro", dynamicData);

  return (
    dynamicData && (
      <Bar
        options={props.position ? optionsposition : options}
        data={props.position ? dataPosition : dynamicData}
      />
    )
  );
}
