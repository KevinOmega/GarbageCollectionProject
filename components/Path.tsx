import React from 'react'
import path from "./Path.module.css";




const Path = ({
    id,position,traffic = "low", direcction = "double", rotation ,unitSize, length} :
    {
        id : number, 
        position : {x : number, y : number}
        traffic : string,
        direcction : string,
        rotation : number,
        unitSize : number;
        corners : {c1 : number, c2 : number};
        length : number
      }) => {
  return (
    <div key={id}  className={path.path} style={ {
      width : `${ (unitSize * length)}px`,
      height : `${unitSize}px`,
      top : position.y * unitSize,
      left :  position.x * unitSize,
      transform : `rotate(${rotation}deg) translate(${unitSize}px, ${rotation === 0 ? 0 : unitSize * -1}px)`,
      }}>
      {/* <div className={path.line}></div> */}
    </div>
  )
}

export default Path
