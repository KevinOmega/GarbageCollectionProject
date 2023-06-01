import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import canvas from "./canvas.module.scss";
import Path from './Path';
import Corner from './Corner';


const Canvas = () => {
    const canvasRef : any = useRef();
    const [lines,setLines] = useState<number[]>([])
    const [unitSize,setUnitSize] = useState<number>(0);
    const numberOfRows = 31;
    const [paths, setPaths] = useState<any>([]);
    const [corners, setCorners] = useState<any>([]);
    const [xs,setXs] = useState<number>(0);
    const [xe,setXe] = useState<number>(0);
    const [ys,setYs] = useState<number>(0);
    const [ye,setYe] = useState<number>(0);

    const graph : any = {};

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

    const onSubmit = (e: any) => {
      e.preventDefault();
      generateMap();
      setXs(0);
      setYs(0);
      setXe(0);
      setYe(0);
    }


    const generateMap = () => {
     for (let i = 0; i < numberOfRows / 5; i++) {
      for (let j = 0; j < (numberOfRows - 1) / 5; j++) {
        generatePath(i * 5,j* 5, i * 5, (j + 1) * 5);
        generatePath(j * 5, i * 5, (j + 1) * 5, i * 5);
      }
     }
     console.log(graph);
    }

    const generatePath = (xs : number, ys : number, xe: number, ye:number) => {
      const id1 = xs.toString() + ys.toString();
      const id2 = xe.toString() + ye.toString();
      const streetID = xs.toString() + ys.toString() + xe.toString() + ye.toString();
      const pathLength = Math.max(xe- xs, ye - ys);
        if(graph[id1] === undefined){
          console.log(id1);
          graph[id1] = [];
          setCorners((current : any) => [
            ...current,
            {id : id1, unitSize : unitSize, position : {x : xs, y : ys}},
          ])
        }
        if(graph[id2] === undefined){
          console.log(id2 , "id2");
          graph[id2] = [];
           setCorners((current : any) => [
            ...current,
            {id : id2, unitSize : unitSize, position : {x : xe, y : ye}},
          ])
        }
      

      graph[id1].push({length : pathLength, time : pathLength * 10, to : id2})
      graph[id2].push({length : pathLength, time :  pathLength * 10, to : id1});
     
        let rotation = 0;
        let length = Math.abs(xe - xs);

      if(ys !== ye){
        rotation = 90;
        length = Math.abs(ye - ys);
      }
      setPaths( (current : any) => [
        ...current,
        {id : streetID, position : {x : xs, y : ys}, rotation, unitSize : unitSize, length : length - 1 }
      ])
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
      console.log(corners);
    },[])

    useEffect(() => {
      generateLines(numberOfRows);
    },[unitSize])

  return (
    <div ref={canvasRef} className={canvas.canvas}  >
      {lines.map((l,index) => <div key={index} className={canvas.verticalLine} style={{left : l}}></div>)}
      {lines.map((l,index) => <div key={index * 10}className={canvas.horizontalLine} style={{top : l}}></div>)}
      {corners.map((corner: React.JSX.IntrinsicAttributes & { unitSize: number; id: "string"; position: { x: number; y: number; }; }) => <Corner key={corner.id}{...corner}/>)}
      {paths.map((p: React.JSX.IntrinsicAttributes & {
          id: number; position: { x: number; y: number; }; traffic: string; direcction: string; rotation: number; unitSize: number; corners: {
            c1: number // const properties = {
            ; c2: number;
          }; length:
          number;
        }) => <Path key={p.id}{...p}/>)}
    </div>
  )
}

export default Canvas
