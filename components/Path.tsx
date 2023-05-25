import React from 'react'
import path from "./Path.module.css";




const Path = ({
    id,position,traffic, direcction,unitSize} :
    {
        id : number, 
        position : {xs : number, ys : number, xe : number,ye : number}
        traffic : string,
        direcction : string,
        unitSize : number;
      }) => {
  return (
    <div className={path.path} style={ {
      width : `${ (unitSize * (position.xe - position.xs))}px`,
      height : `${ (unitSize * (position.ye - position.ys))}px`,
      }}>
      {/* <div className={path.line}></div> */}
    </div>
  )
}

export default Path
