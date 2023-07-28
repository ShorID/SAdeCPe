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
import { reportStyles, reportTableStyles } from "./formsConst";
import ReportDownloader from "./ReportDownloader";
import { months } from "@/pages/admin";

const reportId = "generalReport";

export const GeneralReportDoc = ({ graphsData, graphsRes, data }) => {
  const moreQualifiedCharges =
    graphsData["moreQualifiedCharges"]?.current?.toBase64Image();
  const comparisonLastAndCurrentYear =
    graphsData["comparisonLastAndCurrentYear"]?.current?.toBase64Image();
  const trainingByDepartment =
    graphsData["trainingByDepartment"]?.current?.toBase64Image();
  const orgEffectiveness =
    graphsData["orgEffectiveness"]?.current?.toBase64Image();

  return (
    <Document>
      <Page style={reportStyles.page} size="LETTER">
        <Image
          src="\Formato de Documentos FETESA.jpg"
          alt="alt format"
          style={reportStyles.background}
          fixed
        />
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
              <Image src={comparisonLastAndCurrentYear} alt="comparisonLastAndCurrentYear" />
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
          {trainingByDepartment && (
            <View
              style={{
                width: "50%",
                maxHeight: 300,
                margin: "auto",
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              <Image src={trainingByDepartment} alt="trainingByDepartment" />
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
          <Text style={reportStyles.subtitle}>Cargos mas capacitados</Text>
          <Text style={reportStyles.text}>
            La gráfica &apos;Participación en capacitaciones por cargo&apos; muestra la
            distribución de la participación en las capacitaciones según los
            diferentes cargos dentro de la organización. Este gráfico representa
            visualmente la proporción de empleados que participan en las
            capacitaciones en relación con sus cargos.
          </Text>
          {moreQualifiedCharges && (
            <View style={reportStyles.chartContainer}>
              <Image src={moreQualifiedCharges} alt="moreQualifiedCharges" />
            </View>
          )}
        </View>
        <View style={reportStyles.section}>
          <Text style={reportStyles.subtitle}>
            Efectividad de las organizaciones activas actualmente.
          </Text>
          <Text style={reportStyles.text}>
            Para evaluar la efectividad de cada sesión de capacitación, se puede utilizar la siguiente fórmula:
            &apos;Porcentaje de sesión completada = (Número de colaboradores que completaron la sesión / Número total de colaboradores) * 100&apos;.

            Una vez obtenido el porcentaje de sesiones completadas, se puede calcular un promedio para determinar qué tan completa fue la capacitación en general.

            Además, se puede obtener un promedio general considerando todas las capacitaciones que la organización ha impartido, lo que nos brinda una visión de la efectividad global de las capacitaciones.

            En resumen, siguiendo estos pasos, se puede evaluar la efectividad de cada sesión de capacitación, calcular la efectividad promedio de la capacitación en general y obtener un promedio general de todas las capacitaciones impartidas por la organización.
          </Text>
          {orgEffectiveness && (
            <View
              style={{
                width: "50%",
                maxHeight: 300,
                margin: "auto",
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              <Image src={orgEffectiveness} alt="orgEffectiveness" />
            </View>
          )}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Nombre de la organizacion</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Porcentaje de efectividad</Text>
              </View>
            </View>
            {Array.isArray(graphsRes["orgEffectiveness"]?.labels) &&
              graphsRes["orgEffectiveness"].labels.map((item, key) => (
                <View style={styles.tableRow} key={key}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {graphsRes["orgEffectiveness"].effective[key]}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </Page>
      <Page style={[reportStyles.page, { paddingLeft: 30, paddingRight: 30 }]} size="LETTER" >
        <Image
          src="\Formato de Documentos FETESA.jpg"
          style={reportStyles.background}
          alt="page format"
          fixed
        />
        <View style={reportStyles.section}>
          <Text style={reportStyles.subtitle}>
            Costo de inversiones
          </Text>
          <View style={reportTableStyles.table}>
            {Array.isArray(data.trainingCosts) && data.trainingCosts.map((item, idx) => (
              <React.Fragment key={idx}>
                <View style={[reportTableStyles.row, reportTableStyles.header, { backgroundColor: "#f5bc7f" }]}>
                  <Text style={[reportTableStyles.cell, { flexGrow: 13 }]}>{item.name}</Text>
                </View>
                <View style={[reportTableStyles.row, reportTableStyles.header]}>
                  <Text style={[reportTableStyles.cell, { flexGrow: 4 }]}>Capacitacion</Text>
                  <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>Costo Unitario</Text>
                  <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>Participantes</Text>
                  <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>Costo Final</Text>
                </View>
                {Array.isArray(item.details) && item.details.map((detail, key) => <React.Fragment key={key}>
                  <View style={[reportTableStyles.row]}>
                    <Text style={[reportTableStyles.cell, { flexGrow: 4 }]}>{detail.name}</Text>
                    <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>{detail.costUnit}</Text>
                    <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>{detail.capAssis}</Text>
                    <Text style={[reportTableStyles.cell, { flexGrow: 3 }]}>{detail.costFinal}</Text>
                  </View>
                  <View style={[reportTableStyles.row]}>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 4 }]}>
                      <Text style={[reportTableStyles.cell]}> </Text>
                      <Text style={[reportTableStyles.cell]}>Enero</Text>
                      <Text style={[reportTableStyles.cell]}>Febrero</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>Marzo</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>Abril</Text>
                      <Text style={[reportTableStyles.cell]}>Mayo</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>Junio</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>Julio</Text>
                      <Text style={[reportTableStyles.cell]}>Agosto</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>Septiembre</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>Octubre</Text>
                      <Text style={[reportTableStyles.cell]}>Noviembre</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>Diciembre</Text>
                    </View>
                  </View>
                  <View style={[reportTableStyles.row]}>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 4 }]}>
                      <Text style={[reportTableStyles.cell]}>Costo</Text>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Enero"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Febrero"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>{detail.infoMonths && detail.infoMonths["Marzo"]?.sessionCost}</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Abril"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Mayo"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>{detail.infoMonths && detail.infoMonths["Junio"]?.sessionCost}</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Julio"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Agosto"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>{detail.infoMonths && detail.infoMonths["Septiembre"]?.sessionCost}</Text>
                    </View>
                    <View style={[reportTableStyles.cell, reportTableStyles.subRow, { flexGrow: 3 }]}>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Octubre"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell]}>{detail.infoMonths && detail.infoMonths["Noviembre"]?.sessionCost}</Text>
                      <Text style={[reportTableStyles.cell, { borderRight: "unset", paddingRight: 0 }]}>{detail.infoMonths && detail.infoMonths["Diciembre"]?.sessionCost}</Text>
                    </View>
                  </View>
                </React.Fragment>)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const GeneralReport = (props) => (
  <ReportDownloader id={reportId} props={props} FormComponent={GeneralReportDoc} />
);

const styles = StyleSheet.create({
  table: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    height: "auto",
    marginBottom: 20,
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
