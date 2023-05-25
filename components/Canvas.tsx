import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import canvas from "./canvas.module.scss";
import Path from './Path';

const properties = {
    id : 1,length : 20,traffic : "high",direcction : "forwards", rotation : 90,to :[2] 
}

const Canvas = () => {
    const canvasRef : any = useRef();
    const [lines,setLines] = useState<number[]>([])

    const generateLines  = (n : number) => {
        const canvasWidth = canvasRef.current.getBoundingClientRect().width;
        const canvasHeigth =  canvasRef.current.getBoundingClientRect().height;
        let currentLines = [];
        let unit = canvasWidth / n;
        for (let i = 0; i < n; i++) {
            currentLines.push( i * unit);
        }
        setLines(currentLines);
    }

    useEffect(() => {
        console.log(generateLines(15));
    },[])

  return (
    <div ref={canvasRef} className={canvas.canvas}  >
      <Path {...properties} />
      {lines.map((l,index) => <div className={canvas.verticalLine} style={{left : l}}></div>)}
      {lines.map((l,index) => <div className={canvas.horizontalLine} style={{top : l}}></div>)}
    </div>
  )
}

export default Canvas
