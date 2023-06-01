import React from 'react'
import navbar from "../styles/navbar.module.scss"

const Navbar = () => {
  return (
    <nav className={navbar.navbar}>
      <div className={navbar.logo}>
        <h3>Garbage Collector</h3>
      </div>
    <ul className={navbar.links}>
        <li><a href="#Home">Home</a></li>
        <li><a href="#Project">Project</a></li>
        <li><a href="#Footer">About</a></li>
    </ul>
    </nav>
  )
}

export default Navbar
