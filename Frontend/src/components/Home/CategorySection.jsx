import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategorySection() {
    const navigate = useNavigate();
  return (
    <>
        <h1 className='text-gray-700 font-semibold text-center text-[1.1rem] mt-2 md:mt-0 md:text-4xl'>Trending Categories</h1>
        <div className='mt-5 flex justify-center gap-5'>
            <div onClick={() => navigate('/collection/men')} className='w-[20vw] h-[20vw] flex flex-col justify-center items-center cursor-pointer'>
                <img className='hover:scale-103 transition-all ease-in-out duration-200' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-2.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Men</p>
            </div>
            <div onClick={() => navigate('/collection/women')} className='w-[20vw] h-[20vw] flex flex-col justify-center items-center cursor-pointer'>
                <img className='hover:scale-103 transition-all ease-in-out duration-200' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-3.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Women</p>
            </div>
            <div onClick={() => navigate('/collection/kids')} className='w-[20vw] h-[20vw] flex flex-col justify-center items-center cursor-pointer'>
                <img className='hover:scale-103 transition-all ease-in-out duration-200' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-1.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Kids</p>
            </div>
        </div>
    </>
  )
}

export default CategorySection