import React from "react";
import PropTypes from "prop-types";
import DownloadButton from "./DownloadButton";
import ChartContext from "@/contexts/chart-context";
import fetcher from "@/services/fetcher";
import { chartEndpoints } from "./chartsEndpoints";

const ChartWrapper = (props) => {
  const { saveGraphRes, graphsData } = React.useContext(ChartContext);

  React.useEffect(() => {
    fetcher({ url: chartEndpoints[props.id] }).then(({ data }) => {
      saveGraphRes(props.id, data);
      props.onFinishGet(data);
    });
  }, []);

  return (
    props.ready && (
      <div style={{ position: "relative" }}>
        {props.children}
        <DownloadButton
          onClick={props.onDownload}
          show={graphsData[props.id]?.current}
        />
      </div>
    )
  );
};

ChartWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onFinishGet: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default ChartWrapper;
