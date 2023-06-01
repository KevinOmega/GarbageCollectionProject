import React from 'react'
import Canvas from './Canvas'

const Projects = () => {
  return (
    <section id='Project'>
      <div className="title">
        <h3>Garbage Collector</h3>
        <div className="project-container">
          <div className="control-panel"></div>
          <Canvas/>
        </div>
      </div>
    </section>
  )
}

export default Projects
