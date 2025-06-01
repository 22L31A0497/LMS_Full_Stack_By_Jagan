import React from 'react'
import { Outlet } from 'react-router-dom' // add Outlet
import Navbar from '../../components/educator/Navbar.jsx' // import Navbar
import Sidebar from '../../components/educator/Sidebar.jsx'
import { assets } from '../../assets/assets.js' // import assets
import Footer from '../../components/educator/Footer.jsx'

const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Navbar /> {/* Use Navbar component */}
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1'>
         {<Outlet/>}
         </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Educator
