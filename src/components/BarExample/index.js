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
      text: "Resultados esperados para Plysen",
    },
  },
};

const labels = ["Shoji", "Mike"];

export const data = {
  labels,
  datasets: [
    {
      label: "Antes",
      data: [5, 4, 3, 5, 3, 2, 1],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Esperados",
      data: [6, 5, 4, 6, 4, 4, 2],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BarExample(props) {
  return (
    <Bar
      options={{
        ...options,
        plugins: { ...options.plugins, title: props.title },
      }}
      data={{ ...data, labels: props.labels }}
    />
  );
}
