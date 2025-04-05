import React from 'react'

function Assurance() {
  return (
    <div className='w-full  h-15 mt-10 flex text-3xl justify-center items-center gap-5 md:gap-20 text-gray-700'>
        <div className='flex flex-col justify-center items-center gap-2'>
            <i class="fa-solid fa-rotate-left"></i>
            <span className='text-[1rem]'>Easy Returns</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
            <i class="fa-regular fa-circle-check"></i>
            <span className='text-[1rem]'>Easy Returns</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
            <i class="fa-solid fa-truck-fast"></i>
            <span className='text-[1rem]'>Easy Returns</span>
        </div>
    </div>
  )
}

export default Assurance