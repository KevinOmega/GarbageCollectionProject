import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

const TruckItem = ({ id, quantity, color }) => {
  return (
    <div className="truck-item" key={id}>
      <h5>Truck : {id}</h5>
      <div className="truck-info">
        <p>Capacity : {quantity}</p>
        <div
          className="color"
          style={{ width: "20px", height: "20px", backgroundColor: color }}
        ></div>
        <button>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default TruckItem;
