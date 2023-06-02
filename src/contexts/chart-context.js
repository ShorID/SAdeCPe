import React, { createContext, useEffect, useState } from "react";

const ChartContext = createContext({
  saveGraph: () => {},
  downloadChart: () => () => {},
  graphsData: {},
});

export const ChartProvider = ({ children }) => {
  const [graphsData, setGraphsData] = useState({});

  const saveGraph = (graphId = "", graphData) =>
    setGraphsData((prev) => ({ ...prev, [graphId]: graphData }));

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
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContext;
