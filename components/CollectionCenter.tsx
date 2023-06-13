import React from 'react'
import { useGlobalContext } from '../context/context';

const CollectionCenter = ({id} : {id : string}) => {
   const {unitSize} = useGlobalContext();

  const position : string[] = id.split("-");


  return (
    <div className= "collection-point" style={
      {
      position : "absolute",  
      width : unitSize, 
      height : unitSize, 
      top : Number(position[1]) * unitSize, 
      left : Number(position[0]) * unitSize,
      backgroundColor : "red",
      borderRadius : "50%",
      }}>   
    </div>
  )
}

export default CollectionCenter
