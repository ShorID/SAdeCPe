import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const ReportPDF = (props) => {
  const ref = React.useRef(null);
  // Datos del gráfico
  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas",
        data: [50, 65, 70, 80, 85],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Informe PDF</Text>
            <View style={styles.chartContainer}>
              <Image src={props.chart} />
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    // fontFamily: "Arial",
    fontSize: 12,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    width: "100%",
    height: 300,
  },
});

export default ReportPDF;
