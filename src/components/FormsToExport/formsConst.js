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


export const reportTableStyles = StyleSheet.create({
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

