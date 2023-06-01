import React, { createContext, useEffect, useState } from "react";
import drawerTypes from "@/components/Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import ListDeleteItemModal from "@/components/List/ListDeleteItemModal";
import { sortbyOptions } from "@/components/SortBy";

const ChartContext = createContext({
  saveGraph: () => {},
  graphsData: {},
});

export const ChartProvider = ({ children }) => {
  const [graphsData, setGraphsData] = useState({});

  const saveGraph = (graphId = "", graphData) =>
    setGraphsData((prev) => ({ ...prev, [graphId]: graphData }));

  return (
    <ChartContext.Provider
      value={{
        saveGraph,
        graphsData,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContext;
