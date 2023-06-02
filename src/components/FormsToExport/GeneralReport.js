import React from "react";
import PropTypes from "prop-types";
import {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import ChartContext from "@/contexts/chart-context";

Font.register({
  family: "Arial",
  src: "https://fonts.cdnfonts.com/css/arial-2",
});

const GeneralReport = (props) => {
  const [refresh, setRefresh] = React.useState(0);
  const { graphsData } = React.useContext(ChartContext);

  const moreQualifiedCharges =
    graphsData["moreQualifiedCharges"]?.current?.toBase64Image();
  const comparisonLastAndCurrentYear =
    graphsData["comparisonLastAndCurrentYear"]?.current?.toBase64Image();

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
    return true;
  };

  const DocumentToDownload = ({ graphsData }) => {
    const moreQualifiedCharges =
      graphsData["moreQualifiedCharges"]?.current?.toBase64Image();
    const comparisonLastAndCurrentYear =
      graphsData["comparisonLastAndCurrentYear"]?.current?.toBase64Image();
    console.log("prro wtf", {
      comparisonLastAndCurrentYear,
      moreQualifiedCharges,
      graphsData,
    });
    return (
      <Document>
        <Page style={styles.page} size="LETTER">
          <View style={styles.section}>
            <Text style={styles.title}>Informe General de Capacitaciones</Text>
            <Text style={styles.subtitle}>
              Total de Capacitaciones realizadas en este año
            </Text>
            <Text style={styles.text}>
              El gráfico de barras muestra la cantidad total de capacitaciones
              realizadas en diferentes períodos de tiempo. Cada barra representa
              un período específico, como un mes o un trimestre, y la altura de
              la barra corresponde al número de capacitaciones realizadas
              durante ese período.
            </Text>
            {comparisonLastAndCurrentYear && (
              <View style={styles.chartContainer}>
                <Image src={comparisonLastAndCurrentYear} />
              </View>
            )}
            <Text style={styles.subtitle}>Cargos mas capacitados</Text>
            <Text style={styles.text}>
              La gráfica "Participación en capacitaciones por cargo" muestra la
              distribución de la participación en las capacitaciones según los
              diferentes cargos dentro de la organización. Este gráfico
              representa visualmente la proporción de empleados que participan
              en las capacitaciones en relación con sus cargos.
            </Text>
            {moreQualifiedCharges && (
              <View style={styles.chartContainer}>
                <Image src={moreQualifiedCharges} />
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div key={refresh}>
      {comparisonLastAndCurrentYear && moreQualifiedCharges && (
        <PDFDownloadLink
          document={DocumentToDownload({
            comparisonLastAndCurrentYear,
            moreQualifiedCharges,
            graphsData,
          })}
          // onClick={handleRefresh}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
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

GeneralReport.propTypes = {};

export default GeneralReport;
