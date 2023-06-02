import React, { StrictMode } from 'react'
import Canvas from '../components/Canvas'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Project from '../components/Project'
import {AppProvider} from  "../context/context";

const index = () => {
  return (
    <StrictMode>
      <AppProvider>
        <Navbar/>
        <Home/>
        <Project/>
      </AppProvider>
    </StrictMode>
  )
}

export default index
