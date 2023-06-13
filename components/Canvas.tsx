import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import canvas from "./canvas.module.scss";
import Path from './Path';
import Corner from './Corner';
import { useGlobalContext } from '../context/context';
import path from 'path';
import CollectionCenter from './CollectionCenter';
import CollectionPoint from './CollectionPoint';


const Canvas = () => {


    const {unitSize,setUnitSize,numberOfRows,corners,paths,generateMap,collectionPoints,collectionCenter} = useGlobalContext();

    const canvasRef : any = useRef();
    const [lines,setLines] = useState<number[]>([])

    const generateLines  = (n : number) => {
        let currentLines = [];
        for (let i = 0; i < n; i++) {
            currentLines.push( i * unitSize);
        }
        setLines(currentLines);
    }

    const getUnitSize = (n : number) => {
          const canvasWidth = canvasRef.current.getBoundingClientRect().width;
          setUnitSize(canvasWidth / n);
    }

    useEffect(() => {
        const handleResize = () => {
          getUnitSize(numberOfRows);
        }

        window.addEventListener("resize",handleResize);
        handleResize();

        return () => window.removeEventListener("resize",handleResize)
    },[])

    useEffect(() => {
      generateLines(numberOfRows);
      generateMap();
    },[unitSize])

  return (
    <div ref={canvasRef} className={canvas.canvas}  >
      {lines.map((l,index) => <div key={index} className={canvas.verticalLine} style={{left : l}}></div>)}
      {lines.map((l,index) => <div key={index * 10}className={canvas.horizontalLine} style={{top : l}}></div>)}
      {corners.map((cornerID: string) => <Corner id = {cornerID} key={cornerID}/>)}
      {Object.keys(paths).map((v) => <Path id={v} key={v}/>)}
      {collectionPoints.map((cp : any) => <CollectionPoint id={cp.streetID} quantity={cp.quantity}/>)}
      <CollectionCenter id={collectionCenter}/>
    </div>
  )
}

export default Canvas
