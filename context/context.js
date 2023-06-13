import React, { useContext, useEffect, useState } from "react";
import { PriorityQueue } from "./algorithm";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [unitSize, setUnitSize] = useState(0);
  const [graph, setGraph] = useState({});
  const [paths, setPaths] = useState({});
  const [corners, setCorners] = useState([]);
  const [collectionPoints, setCollectionPoints] = useState({});
  const [collectionCenter, setCollectionCenter] = useState("0-2");
  const [trucks, setTrucks] = useState([]);
  const [result, setResult] = useState([]);

  const numberOfRows = 31;

  //Map Generation

  const generateMap = () => {
    if (Object.keys(graph).length === 0) {
      for (let i = 0; i <= numberOfRows / 6 + 1; i++) {
        for (let j = 0; j < numberOfRows / 6; j++) {
          generatePath(i * 5, j * 5, i * 5, (j + 1) * 5);
          generatePath(j * 5, i * 5, (j + 1) * 5, i * 5);
        }
      }
    }
  };

  const generatePath = (xs, ys, xe, ye, t = 0.5) => {
    if (ye <= 35) {
      if (ys === 15 && ye === 15) {
        t = 1.5;
      }
      if (xs === 15 && xe === 15) {
        t = 1;
      }
      const id1 = xs.toString() + "-" + ys.toString();
      const id2 = xe.toString() + "-" + ye.toString();
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
          [id1]: [...array1, { streetID, time: pathLength * t, to: id2, t }],
          [id2]: [...array2, { streetID, time: pathLength * t, to: id1, t }],
        };
      });
    }
  };

  const drawPaths = () => {
    Object.entries(graph).map((key) => {
      corners.push(key[0]);
      if (key[1]) {
        key[1].map((attr) => {
          if (!paths[attr.streetID]) {
            paths[attr.streetID] = { ...attr };
          }
        });
      }
    });
    moveCollectionCenter("0-10-0-15");
  };

  //Collection Center

  const moveCollectionCenter = (streetID) => {
    const streetNodes = streetID.split("-");
    const node1 = streetNodes[0] + "-" + streetNodes[1];
    const node2 = streetNodes[2] + "-" + streetNodes[3];
    if (graph[node1] !== undefined && graph[node2] !== undefined) {
      let pointX = 0;
      let pointY = 0;

      if (streetNodes[0] === streetNodes[2]) {
        pointX = streetNodes[0];
        pointY = Math.floor(
          (Number(streetNodes[1]) + Number(streetNodes[3])) / 2
        );
      } else {
        pointX = Math.floor(
          (Number(streetNodes[0]) + Number(streetNodes[2])) / 2
        );
        pointY = streetNodes[1];
      }

      const newNode = pointX.toString() + "-" + pointY.toString();

      setCollectionCenter(newNode);

      const streetID1 = node1 + "-" + newNode;
      const streetId2 = newNode + "-" + node2;

      graph[newNode] = [
        {
          streetID: streetID1,
          time: paths[streetID].time / 2 - paths[streetID].t,
          to: node1,
        },
        {
          streetID: streetId2,
          time: paths[streetID].time / 2,
          to: node2,
        },
      ];
      graph[node1].push({
        streetID: streetID1,
        time: paths[streetID].time / 2 - paths[streetID].t,
        to: newNode,
      });
      graph[node2].push({
        streetID: streetId2,
        time: paths[streetID].time / 2,
        to: newNode,
      });
    }
  };

  //Collection  Points

  const addRecollectionPoint = (streetID, quantity) => {
    const streetNodes = streetID.split("-");
    const node1 = streetNodes[0] + "-" + streetNodes[1];
    const node2 = streetNodes[2] + "-" + streetNodes[3];
    let pointX = 0;
    let pointY = 0;

    if (streetNodes[0] === streetNodes[2]) {
      pointX = streetNodes[0];
      pointY = Math.floor(
        (Number(streetNodes[1]) + Number(streetNodes[3])) / 2
      );
    } else {
      pointX = Math.floor(
        (Number(streetNodes[0]) + Number(streetNodes[2])) / 2
      );
      pointY = streetNodes[1];
    }

    const newNode = pointX.toString() + "-" + pointY.toString();

    const streetID1 = node1 + "-" + newNode;
    const streetId2 = newNode + "-" + node2;

    graph[newNode] = [
      {
        streetID: streetID1,
        time: paths[streetID].time / 2 - paths[streetID].t - paths[streetID].t,
        to: node1,
      },
      {
        streetID: streetId2,
        time: paths[streetID].time / 2,
        to: node2,
      },
    ];
    graph[node1].push({
      streetID: streetID1,
      time: paths[streetID].time / 2 - paths[streetID].t,
      to: newNode,
    });
    graph[node2].push({
      streetID: streetId2,
      time: paths[streetID].time / 2,
      to: newNode,
    });
    setCollectionPoints((currentPoints) => {
      return {
        ...currentPoints,
        [newNode]: { streetID: newNode, quantity },
      };
    });
  };

  //Add trucks

  const addTruck = (quantity, color) => {
    setTrucks([...trucks, { id: trucks.length, quantity, color }]);
  };

  const generatePaths = () => {
    let head = collectionCenter;
    const routes = new Array(trucks.length).fill(0).map(() => []);
    for (let truckIndex = 0; truckIndex < trucks.length; truckIndex++) {
      let keepGoing = true;
      while (keepGoing) {
        const distances = {};
        const pointDistances = {};
        distances[head] = 0;

        const heap = new PriorityQueue((a, b) => distances[a] < distances[b]);
        heap.push(head);

        while (!heap.isEmpty()) {
          const currentVertex = heap.pop();
          const neighbors = graph[currentVertex];

          for (let i = 0; i < neighbors.length; i++) {
            const { streetID, time, to } = neighbors[i];
            if (
              distances[to] > distances[currentVertex] + time ||
              distances[to] === undefined
            ) {
              distances[to] = distances[currentVertex] + time;
              heap.push(to);
              if (collectionPoints[to] !== undefined) {
                pointDistances[to] = distances[currentVertex] + time;
              }
            }
          }
        }
        let minDistance = Infinity;
        let point = "0";

        Object.entries(pointDistances).forEach((pair) => {
          if (
            pair[1] < minDistance &&
            trucks[truckIndex].quantity >= collectionPoints[pair[0]].quantity &&
            collectionPoints[pair[0]].quantity > 0
          ) {
            point = pair[0];
          }
        });
        if (point === "0") {
          console.log("break", routes);
          break;
        }

        trucks[truckIndex].quantity =
          trucks[truckIndex].quantity - collectionPoints[point].quantity;

        collectionPoints[point].quantity = 0;

        routes[truckIndex].push([point, pointDistances[point]]);
        head = point;
        // console.log(routes, trucks[truckIndex].quantity);
      }
    }
    setResult(routes);
  };

  useEffect(() => {
    drawPaths();
    console.log(graph);
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
        moveCollectionCenter,
        collectionCenter,
        collectionPoints,
        addRecollectionPoint,
        addTruck,
        trucks,
        generatePaths,
        result,
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
