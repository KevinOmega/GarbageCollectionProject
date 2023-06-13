import React, { useEffect, useState } from 'react'
import corner from "./cormer.module.css";
import { useGlobalContext } from '../context/context';
import { userAgent } from 'next/server';



const Corner = ({id} : {id : string}) => {
  const {unitSize} = useGlobalContext();

  const position : string[] = id.split("-");

  


  return (
    <div className={corner.corner} style={
      {width : unitSize, 
      height : unitSize, 
      top : Number(position[1]) * unitSize, 
      left : Number(position[0]) * unitSize
      }}>   
      <p>{id}</p>
    </div>
  )
}

export default Corner
