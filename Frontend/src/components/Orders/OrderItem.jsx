import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppProvider';

function OrderItem({cartItem}) {

    const navigate = useNavigate(); 
    const {products} = useContext(AppContext);

    let product = products.find((product) => product._id === cartItem.productId)
    
    useEffect(() => {
        if(products) {
            product = products.find((product) => product._id === cartItem.productId)
        }
    },[products]);

    if (!products || !products.length || !product) {
    return (
      <div className="w-full p-4 rounded-md bg-gray-50 text-gray-500">
        Loadings...
      </div>
        );
    }

    return (
        <div className='w-100% p-2 rounded-md cursor-pointer flex gap-3'>
            <div  onClick={() => {navigate(`/item/${cartItem.productId}`)}} className='h-15 w-15 bg-gray-100'>
                <img className='h-15 w-15 object-contain rounded-md m-auto' src={product?.images[0].url} alt="" />
            </div>
            <div className='flex md:flex-row flex-col gap-1 md:gap-2 w-full'>
                <div className='flex flex-col overflow-hidden'>
                    <h1 className='font-medium md:font-semibold text-gray-700 text-[0.9rem] md:text-[0.9rem]'>{product.title}</h1>
                    <div className='flex flex-row gap-4 text-gray-700 text-[0.8rem]'>
                        <p className='flex gap-1'>Size:<b>{cartItem.selectedSize.toUpperCase()}</b></p>
                        <p className='flex gap-1'>Quantity:<b>{cartItem.quantity}</b></p>
                        <h1 className='text-[0.8rem] text-gray-700 font-semibold flex gap-2 items-center'>Price: &#8377;{cartItem.price*cartItem.quantity}<p className='hidden md:block font-light text-[0.7rem]'>({cartItem.price} &times; {cartItem.quantity})</p></h1>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default OrderItem