import React,{useEffect, useState} from 'react'
import path from "./Path.module.css";
import { useGlobalContext } from '../context/context';




const Path = ({ id } : { id : string }) => {
  const {unitSize} = useGlobalContext();
  const position : number[]= id.split("-").map((s) => Number(s));

  let length = Math.max(position[2] - position[0], position[3] - position[1]);
  let rotation = 90;

  if(position[1] === position[3]){
    rotation = 0;
  }
  
  return (
    <div key={id}  className={path.path} style={ {
      width : `${ (unitSize * (length - 1))}px`,
      height : `${unitSize}px`,
      top : position[1] * unitSize,
      left :  position[0] * unitSize,
      transform : `rotate(${rotation}deg) translate(${unitSize}px, ${rotation ? -unitSize : 0}px)`,
      
      }}>
        <p>{id}</p>
    </div>
  )
}

export default Path
