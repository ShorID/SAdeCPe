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
};

export const reportStyles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: "56px 63px",
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
});
