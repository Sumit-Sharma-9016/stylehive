import React, { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import { UserContext } from '../../context/UserProvider';

function AllOrderItem({item}) {
    const {products} = useContext(AppContext);
    
    const product = products.find((product) => product._id === item.productId);

    if(!product) {
        return <div className='text-center text-gray-700'>loading...</div>
    }
    return (
        <div className='w-100% p-2 rounded-md cursor-pointer flex gap-3'>
            <div  onClick={() => {navigate(`/item/${item.productId}`)}} className='h-15 w-15 bg-gray-100'>
                <img className='h-15 w-15 object-contain rounded-md m-auto' src={product.images[0].url} alt="" />
            </div>
            <div className='flex md:flex-row flex-col gap-1 md:gap-2 w-full'>
                <div className='flex flex-col overflow-hidden'>
                    <h1 className='font-medium md:font-semibold text-gray-700 text-[0.8rem] md:text-[0.9rem] lg:text-[0.9rem]'>{product.title}</h1>
                    <div className='flex flex-row gap-4 text-gray-700 text-[0.7rem] md:text-[0.8rem]'>
                        <p className='flex gap-1'>Size:<b>{item.selectedSize}</b></p>
                        <p className='flex gap-1'>Quantity:<b>{item.quantity}</b></p>
                    </div>
                </div>
                <h1 className='text-[0.7rem] md:text-[0.8rem] text-gray-700 font-semibold flex gap-2 items-center'>Price: &#8377;{item.price * item.quantity}<p className='hidden md:block font-light text-[0.7rem]'>({item.price} &times; {item.quantity})</p></h1>
            </div>
        </div>
  )
}

export default AllOrderItem