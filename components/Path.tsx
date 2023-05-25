import React from 'react'
import path from "./Path.module.css";




const Path = ({
    id,length,traffic,direcction, rotation,to} :
    {
        id : number, 
        length : number,
        traffic : string,
        direcction : string,
        rotation : number; 
        to : number[]
    }) => {
  return (
    <div className={path.path} style={{transform : `rotate(${rotation}deg)`, width : `${10 * length}px`}}>
      <div className={path.line}></div>
    </div>
  )
}

export default Path
