import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [unitSize, setUnitSize] = useState(0);
  const [graph, setGraph] = useState({});
  const [paths, setPaths] = useState({});
  const [corners, setCorners] = useState([]);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [collectionCenter, setCollectionCenter] = useState();

  const numberOfRows = 31;

  const generateMap = () => {
    for (let i = 0; i <= numberOfRows / 6 + 1; i++) {
      for (let j = 0; j < numberOfRows / 6; j++) {
        generatePath(i * 5, j * 5, i * 5, (j + 1) * 5);
        generatePath(j * 5, i * 5, (j + 1) * 5, i * 5);
      }
    }
    generatePath(25, 30, 30, 30);
  };

  const generatePath = (xs, ys, xe, ye) => {
    if (ye <= 35) {
      const id1 = xs.toString() + "," + ys.toString();
      const id2 = xe.toString() + "," + ye.toString();
      const streetID =
        xs.toString() +
        "-" +
        ys.toString() +
        "-" +
        xe.toString() +
        "-" +
        ye.toString();
      const pathLength = Math.max(xe - xs, ye - ys);

      setGraph((currentGraph) => {
        const array1 = currentGraph[id1] !== undefined ? currentGraph[id1] : [];
        const array2 = currentGraph[id2] !== undefined ? currentGraph[id2] : [];
        return {
          ...currentGraph,
          [id1]: [...array1, { streetID, time: pathLength * 10, to: id2 }],
          [id2]: [...array2, { streetID, time: pathLength * 10, to: id1 }],
        };
      });
    }
  };

  const drawPaths = () => {
    Object.entries(graph).map((key) => {
      corners.push(key[0]);
      if (key[1]) {
        key[1].map(({ streetID }) => {
          if (!paths[streetID]) {
            paths[streetID] = true;
          }
        });
      }
    });
  };

  const addCollectionCenter = (streetID) => {
    const streetNodes = streetID.split("-");
    const node1 = streetNodes[0] + "-" + streetNodes[1];
    const node2 = streetNodes[2] + "-" + streetNodes[3];
    console.log(node1, node2);
  };

  useEffect(() => {
    drawPaths();
    addCollectionCenter("0-0-5-0");
  }, [graph]);

  return (
    <AppContext.Provider
      value={{
        unitSize,
        setUnitSize,
        numberOfRows,
        graph,
        setGraph,
        corners,
        paths,
        generateMap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
