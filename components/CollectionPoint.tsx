import React from 'react'
import { useGlobalContext } from '../context/context';


const CollectionPoint = ({id, quantity} : {id : string, quantity : number}) => {
  const {unitSize} = useGlobalContext();

  const position : string[] = id.split("-");


  return (
    <div id={id} className= "collection-point"  key={id} style={
      {
      position : "absolute",  
      width : unitSize, 
      height : unitSize, 
      top : Number(position[1]) * unitSize, 
      left : Number(position[0]) * unitSize,
      backgroundColor : "blue",
      borderRadius : "50%",
      display : 'flex',
      alignItems : "center",
      justifyContent : "center"
      }}>   
      <p style={{
        color : "white",
        fontSize : "10px"
        
      }}>{quantity}</p>
    </div>
  )
}

export default CollectionPoint
