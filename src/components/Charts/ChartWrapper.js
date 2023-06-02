import React from "react";
import PropTypes from "prop-types";
import DownloadButton from "./DownloadButton";
import ChartContext from "@/contexts/chart-context";
import fetcher from "@/services/fetcher";
import { chartEndpoints } from "./chartsEndpoints";
import Icon from "../Icon";
import { Button, ButtonGroup } from "reactstrap";

const ChartWrapper = (props) => {
  const { saveGraphRes, graphsData } = React.useContext(ChartContext);
  const [refresh, setRefresh] = React.useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
    getData();
  };

  const getData = () =>
    fetcher({ url: props.endpoint || chartEndpoints[props.id] }).then(
      ({ data }) => {
        saveGraphRes(props.id, data);
        props.onFinishGet(data);
      }
    );

  React.useEffect(() => {
    getData()
  }, []);

  return (
    props.ready && (
      <div
        key={refresh}
        style={{ position: "relative", ...(props.style ? props.style : {}) }}
      >
        {props.children}
        <hr style={{ marginBottom: 0 }} />
        <ButtonGroup style={{ marginBottom: 10 }}>
          <DownloadButton
            onClick={props.onDownload}
            show={graphsData[props.id]?.current}
          />
          <Button
            size="sm"
            color="success"
            type="button"
            style={{
              display: graphsData[props.id]?.current ? "block" : "none",
            }}
            onClick={handleRefresh}
          >
            <Icon name="faArrowRightRotate" />
          </Button>
        </ButtonGroup>
      </div>
    )
  );
};

ChartWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onFinishGet: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  endpoint: PropTypes.string,
  style: PropTypes.object,
};

export default ChartWrapper;
