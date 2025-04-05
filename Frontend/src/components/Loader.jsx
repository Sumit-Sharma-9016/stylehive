import React from 'react'
import loading from '../assets/loading.gif'

function Loader() {
    return (
        <div className='h-[100%] w-[100%] flex flex-col justify-center items-center'>
            <img className='h-5 md:h-8' src={loading} alt="" />
            <h2 className='text-gray-700 text-[.6rem] md:text-[.8rem] lg:text-[1rem]'>Just hold a second...</h2>
        </div>
    );
}

export default Loader