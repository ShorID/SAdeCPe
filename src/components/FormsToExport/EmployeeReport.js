import React from "react";
import PropTypes from "prop-types";
import ChartContext from "@/contexts/chart-context";
import { reportStyles } from "./formsConst";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import ReportDownloader from "./ReportDownloader";
import fetcher from "@/services/fetcher";

const reportId = "employeeReport";

const EmployeeReportDoc = ({ data }) => {
  const { graphsData, graphsRes } = React.useContext(ChartContext);

  const renderField = (label, fieldName) => (
    <Text style={reportStyles.text}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>:{" "}
      <Text>{data[fieldName] || fieldName}</Text>
    </Text>
  );

  return (
    <Document>
      <Page style={reportStyles.page} size="LETTER">
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
            <View style={{ width: "50%", maxHeight: 300, marginBottom: 20 }}>
              <Image
                src={fetcher.defaults.baseURL + data.photo}
                alt={data.name}
                className="mx-auto"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "1px gray solid",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </View>
            <View style={{ width: "50%" }}>
              {renderField("Nombre", "name")}
              {renderField("Apellido", "lastName")}
              {renderField("Cedula", "identification")}
              {renderField("Fecha de admision", "admissionDate")}

              {renderField("Id de referencia", "refNumber")}
              {renderField("Cargo", data.position.name)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const EmployeeReport = (props) => {
  return <ReportDownloader id={reportId} props={props} FormComponent={EmployeeReportDoc} />;
};

EmployeeReport.propTypes = {
  data: PropTypes.object
};

export default EmployeeReport;
