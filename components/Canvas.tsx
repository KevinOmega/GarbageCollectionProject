import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import canvas from "./canvas.module.scss";
import Path from './Path';

const properties = {
    id : 1,length : 20,traffic : "high",direcction : "forwards", rotation : 90,to :[2] 
}

const Canvas = () => {
    const canvasRef : any = useRef();
    const [lines,setLines] = useState<number[]>([])
    const [unitSize,setUnitSize] = useState<number>(0);
    const numberOfRows = 15;

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
    },[unitSize])

  return (
    <div ref={canvasRef} className={canvas.canvas}  >
      <Path {...properties} />
      {lines.map((l,index) => <div key={index} className={canvas.verticalLine} style={{left : l}}></div>)}
      {lines.map((l,index) => <div key={index * 10}className={canvas.horizontalLine} style={{top : l}}></div>)}
    </div>
  )
}

export default Canvas
