import React from 'react'

function Footer() {
  return (
    <div className='bg-black text-gray-400 w-[100%] p-10 h-[25vh] md:h-[10vh] flex flex-col md:flex-row text-center justify-between items-center mt-10 md:gap-5 gap-3'>
        <div className='flex justify-center items-center gap-1'>
            <h2 className='text-gray-700 font-semibold'>&copy;2025</h2><span className='hover:text-white text-2xl font-extrabold logo-title text-gray-400'>STYLEHIVE</span>
        </div>
        <p className='text-white'>all rights reserved &copy;</p>
        <div className='flex md:text-2xl text-[1.2rem] gap-5'>
            <i className="hover:text-white fa-brands fa-instagram"></i>
            <i className="hover:text-white fa-brands fa-youtube"></i>
            <i className="hover:text-white fa-brands fa-x-twitter"></i>
            <i className="hover:text-white fa-brands fa-facebook"></i>
        </div>
    </div>
  )
}

export default Footer