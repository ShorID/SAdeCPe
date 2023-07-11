import { StyleSheet } from "@react-pdf/renderer";

export const reportsConst = {
  generalReport: {
    name: "Reporte General",
    graphs: [
      "trainingByDepartment",
      "moreQualifiedCharges",
      "comparisonLastAndCurrentYear",
    ],
  },
  employeeReport: {
    name: "Reporte General De Empleado",
    graphs: [],
  },
};


export const reportStyles = StyleSheet.create({
  page: {
    position: "relative",
    fontFamily: "Roboto",
    fontSize: 11,
    padding: "90px 63px 56px 63px",
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 'auto',
    height: 'auto',
    zIndex: -100,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 11,
    fontWeight: "normal",
    textAlign: "justify",
  },
  chartContainer: {
    width: "100%",
    maxHeight: 300,
    marginBottom: 20,
  },
  chart: {
    objectFit: "contain",
    objectPosition: "center"
  },
});
