import React from 'react'
import Canvas from './Canvas'
import ControlPanel from './ControlPanel'

const Projects = () => {
  return (
    <section id='Project'>
      <div className="title">
        <h3>Garbage Collector</h3>
        <div className="project-center">
          <ControlPanel/>
          <div className="canvas-container">
            <Canvas/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
