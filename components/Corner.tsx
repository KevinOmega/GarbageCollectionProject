import React from 'react'
import corner from "./cormer.module.css";


interface nodeStructure {
  to : string,
  time : number,
  length : number,
}

interface pathStructure  {
    up : nodeStructure,
    left : nodeStructure,
    right : nodeStructure,
    top : nodeStructure,
}

const Corner = ({id,unitSize, position} : {unitSize : number, id : "string" , position : {x : number, y : number}}) => {
  return (
    <div className={corner.corner} style={{width : unitSize, height : unitSize, top : position.y * unitSize, left : position.x * unitSize}}>
      
    </div>
  )
}

export default Corner
