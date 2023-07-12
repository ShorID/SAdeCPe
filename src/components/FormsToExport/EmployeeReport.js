import React from "react";
import PropTypes from "prop-types";
import { reportStyles } from "./formsConst";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import ReportDownloader from "./ReportDownloader";
import EmployeeTags from "../Charts/EmployeeTags";

const reportId = "employeeReport";

const tableStyles = StyleSheet.create({
  table: {
    display: "table",
    borderWidth: 1,
    borderStyle: "solid",
    borderLeft: "unset",
    borderTop: "unset",
    borderRight: "unset",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderLeft: "unset",
    borderTop: "unset",
    borderBottom: "unset",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    borderRight: "unset",
    borderBottom: "unset",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "center",
    height: 24,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
    flexGrow: 1,
  },
  subRow: {
    flexGrow: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
});

const EmployeeReportDoc = ({ data, graphsData, graphsRes }) => {
  const renderField = (label, fieldName) => (
    <Text style={[reportStyles.text, { marginBottom: "5px" }]}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>:{" "}
      <Text>{data[fieldName] || fieldName}</Text>
    </Text>
  );
  const id = EmployeeTags.graphId + data.id;
  const radarChart = graphsData[id]?.current?.toBase64Image();

  return (
    <Document>
      <Page style={reportStyles.page} size="LETTER">
        <Image
          src="\Formato de Documentos FETESA.jpg"
          style={reportStyles.background}
          fixed
        />
        <View style={reportStyles.section}>
          <Text style={reportStyles.title}>
            {`Informe general de ${data.name} ${data.lastName}`}
          </Text>
          <Text style={reportStyles.subtitle}>Datos Generales</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "40%", maxHeight: 300, marginBottom: 20 }}>
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + data.photo}
                alt={data.name}
                className="mx-auto"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px gray solid",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </View>
            <View style={{ width: "60%" }}>
              {renderField("Nombre", "name")}
              {renderField("Apellido", "lastName")}
              {renderField("Cedula", "identification")}
              {renderField("Fecha de admision", "admissionDate")}

              {renderField("Id de referencia", "refNumber")}
              {renderField("Cargo", data.position.name)}
            </View>
          </View>
        </View>
        <View style={reportStyles.section}>
          <Text style={reportStyles.subtitle}>Areas de conocimiento</Text>
          {radarChart && (
            <View style={reportStyles.chartContainer}>
              <Image src={radarChart} style={reportStyles.chart} />
            </View>
          )}
          <Text style={reportStyles.text}>
            El gráfico radial representa los temas en los que un trabajador ha
            sido capacitado, evaluando la cantidad de veces que ha recibido
            capacitación en cada uno de ellos. Cada sección del gráfico
            representa un tema específico, y el tamaño de la sección refleja la
            frecuencia de capacitación en ese tema.
          </Text>
        </View>
      </Page>
      <Page style={reportStyles.page} size="LETTER">
        <Image
          src="\Formato de Documentos FETESA.jpg"
          style={reportStyles.background}
          fixed
        />
        <View style={reportStyles.section}>
          {Array.isArray(graphsRes[id]?.labels) &&
            Array.isArray(graphsRes[id]?.points) &&
            graphsRes[id].labels.map((item, key) => (
              <View style={tableStyles.tableRow} key={key}>
                <View style={tableStyles.tableCol}>
                  <Text style={tableStyles.tableCell}>{item}</Text>
                </View>
                <View style={tableStyles.tableCol}>
                  <Text style={tableStyles.tableCell}>
                    {graphsRes[id].points[key]}
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <View style={reportStyles.section}>
          <Text style={reportStyles.subtitle}>Historial de Capacitaciones</Text>
          <View style={styles.table}>
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell]}>#</Text>
              <Text style={[styles.cell, { flexGrow: 2 }]}>Nombre</Text>
              <Text style={[styles.cell]}>Hr. Pendientes</Text>
              <Text style={[styles.cell]}>Hr. Fallidas</Text>
              <Text style={[styles.cell]}>Hr. Completadas</Text>
            </View>
            {data.trainingData.capacitations.map((item, key) => (
              <React.Fragment>
                <View
                  key={key + "-1"}
                  style={[styles.row, { backgroundColor: "#f5bc7f" }]}
                >
                  <Text style={styles.cell}>CAP-{item.idCap}</Text>
                  <Text style={[styles.cell, { flexGrow: 2 }]}>
                    {item.nameCap}
                  </Text>
                  <Text style={styles.cell}>
                    {item.totalHourProjectedDescrip}
                  </Text>
                  <Text style={styles.cell}>{item.totalHourFailedDescrip}</Text>
                  <Text style={styles.cell}>
                    {item.totalHourSuccessDescrip}
                  </Text>
                </View>
                <View
                  key={key + "-2"}
                  style={[styles.row, { fontWeight: "bold" }]}
                >
                  <Text style={styles.cell}> </Text>
                  <View style={[styles.cell, styles.subRow]}>
                    <Text style={styles.cell}>Fecha</Text>
                    <Text
                      style={[
                        styles.cell,
                        { borderRight: "unset", paddingRight: 0 },
                      ]}
                    >
                      Horario
                    </Text>
                  </View>
                  <Text style={styles.cell}>Total Hrs</Text>
                  <Text style={styles.cell}>Sesion</Text>
                  <Text style={styles.cell}>Estado</Text>
                </View>
                {item.sessions.map((session, sKey) => (
                  <View key={key + "-3-" + sKey} style={styles.row}>
                    <Text style={styles.cell}> </Text>
                    <View style={[styles.cell, styles.subRow]}>
                      <Text style={styles.cell}>{session.dates}</Text>
                      <Text
                        style={[
                          styles.cell,
                          { borderRight: "unset", paddingRight: 0 },
                        ]}
                      >
                        {session.schedule}
                      </Text>
                    </View>
                    <Text style={styles.cell}>{session.durationDescrip}</Text>
                    <Text style={styles.cell}>{session.stateSession}</Text>
                    <Text style={styles.cell}>{session.statusColSession}</Text>
                  </View>
                ))}
              </React.Fragment>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const EmployeeReport = (props) => {
  return (
    <ReportDownloader
      id={reportId}
      props={props}
      FormComponent={EmployeeReportDoc}
      title={`Informe general de ${props.data.name} ${props.data.lastName}.pdf`}
    />
  );
};

EmployeeReport.propTypes = {
  data: PropTypes.object,
};

export default EmployeeReport;
