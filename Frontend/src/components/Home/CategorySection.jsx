import React from 'react'

function CategorySection() {
  return (
    <>
        <h1 className='text-gray-700 font-semibold text-center text-[1.1rem] mt-2 md:mt-0 md:text-4xl'>Trending Categories</h1>
        <div className='mt-5 flex justify-center gap-5'>
            <div className='w-[20vw] h-[20vw] flex flex-col justify-center items-center'>
                <img className='' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-2.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Men</p>
            </div>
            <div className='w-[20vw] h-[20vw] flex flex-col justify-center items-center'>
                <img className='' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-3.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Women</p>
            </div>
            <div className='w-[20vw] h-[20vw] flex flex-col justify-center items-center'>
                <img className='' src="https://cdn.anscommerce.com/live/image/catalog/brandstore/vastrado/rounded-1.png" alt="" />
                <p className='text-center text-[1rem] md:text-2xl'>Kids</p>
            </div>
        </div>
    </>
  )
}

export default CategorySection