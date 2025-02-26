import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div>
      <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
        <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
          <div className='flex flex-col md:items-start items-center w-full'>
            <img src={assets.logo_dark} alt="logo"/>
            <p className="text-gray-500 text-sm">Committed to providing quality education and resources to help you grow and succeed.
             </p>
          </div>
          <div></div>
          <div></div>

        </div>
        <p>Copyright 2025 © Edemy-By Jagan. All rights reserved. Unauthorized reproduction or distribution is strictly prohibited</p>
      </footer>
    </div>
  )
}

export default Footer
