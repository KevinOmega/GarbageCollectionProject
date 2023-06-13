import React from 'react'
import Canvas from './Canvas'
import ControlPanel from './ControlPanel'
import { useGlobalContext } from '../context/context'

const Projects = () => {
  const {generatePaths,result} = useGlobalContext()

  return (
    <section id='Project'>
      <div className="title">
        <h3>Garbage Collector</h3>
        <div className="project-center">
          <ControlPanel/>
          <div className="canvas-container">
            <Canvas/>
            <div className="info">
              <button className='primary-button' onClick={generatePaths}>Generate</button>
              {result.length ? 
                <div className='results'>
                  {result.map((values : any,index : any) =>
                   <div className='single-result'><p>Truck {index} : {values.map((v : any) => v)}</p></div> )}
                </div>
              : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
