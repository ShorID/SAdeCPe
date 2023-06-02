import React from "react";
import PropTypes from "prop-types";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import ChartContext from "@/contexts/chart-context";
import { reportStyles } from "./formsConst";
import ReportDownloader from "./ReportDownloader";

const reportId = "generalReport";

export const GeneralReportDoc = (props) => {
  const { graphsData, graphsRes } = React.useContext(ChartContext);

  const moreQualifiedCharges =
    graphsData["moreQualifiedCharges"]?.current?.toBase64Image();
  const comparisonLastAndCurrentYear =
    graphsData["comparisonLastAndCurrentYear"]?.current?.toBase64Image();
  const trainingByDepartment =
    graphsData["trainingByDepartment"]?.current?.toBase64Image();

  return (
    <Document>
      <Page style={reportStyles.page} size="LETTER">
        <View style={reportStyles.section}>
          <Text style={reportStyles.title}>
            Informe General de Capacitaciones
          </Text>
          <Text style={reportStyles.subtitle}>
            Total de Capacitaciones realizadas en este año
          </Text>
          <Text style={reportStyles.text}>
            El gráfico de barras muestra la cantidad total de capacitaciones
            realizadas en diferentes períodos de tiempo. Cada barra representa
            un período específico, como un mes o un trimestre, y la altura de la
            barra corresponde al número de capacitaciones realizadas durante ese
            período.
          </Text>
          {comparisonLastAndCurrentYear && (
            <View style={reportStyles.chartContainer}>
              <Image src={comparisonLastAndCurrentYear} />
            </View>
          )}
          <Text style={reportStyles.subtitle}>
            Capacitaciones realizadas por cada departamento
          </Text>
          <Text style={reportStyles.text}>
            El gráfico circular muestra la distribución de las capacitaciones
            por departamento en forma de un pastel dividido en secciones. Cada
            sección del pastel representa un departamento y el tamaño de cada
            sección refleja la proporción de capacitaciones que se han llevado a
            cabo en ese departamento en comparación con el total.
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            {trainingByDepartment && (
              <View style={{ width: "50%", maxHeight: 300, marginBottom: 20 }}>
                <Image src={trainingByDepartment} />
              </View>
            )}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Departamento</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}># Sesiones</Text>
                </View>
              </View>
              {Array.isArray(graphsRes["trainingByDepartment"]?.labels) &&
                graphsRes["trainingByDepartment"].labels.map((item, key) => (
                  <View style={styles.tableRow} key={key}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {graphsRes["trainingByDepartment"].data[key]}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
          <Text style={reportStyles.subtitle}>Cargos mas capacitados</Text>
          <Text style={reportStyles.text}>
            La gráfica "Participación en capacitaciones por cargo" muestra la
            distribución de la participación en las capacitaciones según los
            diferentes cargos dentro de la organización. Este gráfico representa
            visualmente la proporción de empleados que participan en las
            capacitaciones en relación con sus cargos.
          </Text>
          {moreQualifiedCharges && (
            <View style={reportStyles.chartContainer}>
              <Image src={moreQualifiedCharges} />
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

const GeneralReport = () => (
  <ReportDownloader id={reportId} FormComponent={GeneralReportDoc} />
);

const styles = StyleSheet.create({
  table: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    width: "40%",
    height: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

GeneralReport.propTypes = {};

export default GeneralReport;
