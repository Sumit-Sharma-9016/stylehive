import React, { useState } from 'react'
import Loader from '../Loader'
import { Link } from 'react-router-dom';

function Item({product}) {
    const {_id, images, title, price, reviews} = product;
    let ratingSum = 0
    reviews.forEach(element => {
        ratingSum += element.rating;
    });
    
    return (
        <Link to={`/item/${_id}`} className='cursor-pointer justify-self-center bg-gray-200 shrink-0 flex flex-col items-center md:h-50 md:w-35 xl:h-65 xl:w-50 h-40 w-25 overflow-hidden'>
            <div className='img-container md:h-35 md:w-35 xl:h-50 xl:w-50 h-30 w-25 overflow-hidden bg-gray-100'>
                <img src={images[0].url} alt="" />
            </div>
            <div className='product-details flex flex-col justify-start h-fit w-25 md:h-15 md:w-35 xl:h-15 xl:w-50 lg:p-2 p-1 text-nowrap overflow-hidden'>
                <p className='md:text-[0.8rem] lg:text-[0.9rem] text-start lg:text-nowrap text-[0.5rem] overflow-hidden text-gray-700'>{title}</p>
                <div className='flex gap-2 items-center md:text-[.8rem] text-[0.6rem] text-gray-700'>
                    <p className='font-semibold text-gray-900'>&#8377;{price}</p>
                    {reviews.length > 0 &&<div className='flex gap-0.5'>
                        <p>{(ratingSum/reviews.length).toFixed(1)} &#9733;</p>
                        <p>({reviews.length})</p>
                    </div> }
                </div>
            </div>
        </Link>
    )
}

export default Item