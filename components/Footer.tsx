import React from 'react'
import { icons } from '../context/icons'
import { link } from 'fs'

const Footer = () => {
  return (
    <footer id='Footer'>
        <div className="title">
            <h3>Kevin Huayllas</h3>
        </div>
        <ul className="icons">
            {icons.map((icon,index) => <li key={index} ><a href={icon.url}><i>{icon.logo}</i><p>{icon.name}</p></a></li>)}
        </ul>
    </footer>
  )
}

export default Footer
