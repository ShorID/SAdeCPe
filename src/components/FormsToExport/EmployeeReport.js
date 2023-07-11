import React from "react";
import PropTypes from "prop-types";
import { base64DocFormatt, reportStyles } from "./formsConst";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import ReportDownloader from "./ReportDownloader";
import EmployeeTags from "../Charts/EmployeeTags";
import reportSources from "./reportSources";

const reportId = "employeeReport";

const EmployeeReportDoc = ({ data, graphsData, graphsRes }) => {
  const renderField = (label, fieldName) => (
    <Text style={{ ...reportStyles.text, marginBottom: "5px" }}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>:{" "}
      <Text>{data[fieldName] || fieldName}</Text>
    </Text>
  );

  const radarChart =
    graphsData[EmployeeTags.graphId + data.id]?.current?.toBase64Image();

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
