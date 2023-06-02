import React from "react";
import PropTypes from "prop-types";
import ChartContext from "@/contexts/chart-context";
import { Font, PDFDownloadLink } from "@react-pdf/renderer";
import { reportsConst } from "./formsConst";
import { Button, ButtonGroup, Spinner } from "reactstrap";
import Icon from "../Icon";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto/Roboto-Regular.ttf",
    },
    {
      src: "/fonts/Roboto/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Roboto/Roboto-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const ReportDownloader = ({ id, FormComponent, props, graphs }) => {
  const { graphsData, graphsRes } = React.useContext(ChartContext);
  const [refresh, setRefresh] = React.useState(0);
  const isReady = !reportsConst[id].graphs.some(
    (item) => !graphsData[item]?.current
  );

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  return (
    isReady && (
      <ButtonGroup key={refresh}>
        <PDFDownloadLink
          document={FormComponent({
            graphsData,
            graphsRes,
            ...(props ? props : {}),
          })}
          fileName={reportsConst[id].name + ".pdf"}
          className="w-100"
        >
          {({ blob, url, loading, error }) => (
            <Button
              disabled={loading}
              color="warning"
              className="w-100"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              Descargar este reporte
              {loading && (
                <Spinner color="primary" size="sm" className="mx-1" />
              )}
            </Button>
          )}
        </PDFDownloadLink>
        <Button color="success" onClick={handleRefresh}>
          <Icon name="faArrowRightRotate" />
        </Button>
      </ButtonGroup>
    )
  );
};

ReportDownloader.propTypes = {};

export default ReportDownloader;
