import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [unitSize, setUnitSize] = useState(0);
  const [graph, setGraph] = useState({});

  const numberOfRows = 31;

  useEffect(() => {
    console.log(graph);
  }, [graph]);

  return (
    <AppContext.Provider
      value={{ unitSize, setUnitSize, numberOfRows, graph, setGraph }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
