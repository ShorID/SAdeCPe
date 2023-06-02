import React, { createContext, useEffect, useState } from "react";

const ChartContext = createContext({
  saveGraph: () => {},
  saveGraphRes: () => {},
  downloadChart: () => () => {},
  graphsData: {},
  graphsRes: {},
});

export const ChartProvider = ({ children }) => {
  const [graphsData, setGraphsData] = useState({});
  const [graphsRes, setGraphsRes] = useState({});

  const saveGraph = (graphId = "", graphData) =>
    setGraphsData((prev) => ({ ...prev, [graphId]: graphData }));

  const saveGraphRes = (graphId = "", graphData) =>
    setGraphsRes((prev) => ({ ...prev, [graphId]: graphData }));

  const downloadChart = (graphId) => () => {
    let link = document.createElement("a");
    link.download = graphId + ".png";
    link.href = graphsData[graphId].current.toBase64Image();
    link.click();
  };

  return (
    <ChartContext.Provider
      value={{
        saveGraph,
        graphsData,
        downloadChart,
        graphsRes,
        saveGraphRes,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContext;
