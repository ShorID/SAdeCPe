import React, { useEffect } from "react";
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
import { Button } from "reactstrap";
import ReportPDF from "../PDFTest";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
  animation: {
    onComplete: function () {
      alert("Line Chart Rendered Completely!");
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
  const [base64, setbase64] = React.useState();
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

  const downloadChart = () => {
    let link = document.createElement("a");
    link.download = "wtf.jpg";
    link.href = ref.current.toBase64Image();
    setbase64(link.href);
    link.click();
  };

  return (
    dynamicData && (
      <div>
        <div>
          <Bar
            ref={ref}
            options={
              props.position
                ? optionsposition
                : {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Comparativa de capaciaciones Enero-Julio",
                      },
                    }
                  }
            }
            data={props.position ? dataPosition : dynamicData}
          />
        </div>
        <Button onClick={downloadChart}>Descargar</Button>
        {base64 && (
          <PDFDownloadLink
            document={<ReportPDF chart={base64} />}
            fileName="reporte.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generando PDF..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        )}
      </div>
    )
  );
}
