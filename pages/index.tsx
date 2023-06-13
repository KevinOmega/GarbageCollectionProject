import React, { StrictMode } from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Project from '../components/Project'
import {AppProvider} from  "../context/context";
import Footer from '../components/Footer';

const index = () => {
  return (
      <AppProvider>
        <Navbar/>
        <Home/>
        <Project/>
        <Footer/>
      </AppProvider>
  )
}

export default index
