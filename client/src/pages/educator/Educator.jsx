import React from 'react'
import { Outlet } from 'react-router-dom' // add Outlet

const Educator = () => {
  return (
    <div>
      <h1>Educator page</h1>
      <div>
         {<Outlet/>}
      </div>
    </div>
  )
}

export default Educator
