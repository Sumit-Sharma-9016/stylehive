import React from 'react'

export default function Highlights({url}) {
  return (
    <div className='w-[100%] mt-10 flex justify-center overflow-hidden'>
        <div className='w-[90%] overflow-hidden'>
            <img className='w-[100%] hover:scale-105 transition-all ease-in-out duration-300' src={url} alt="" />
        </div>
    </div>
  )
}
