import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppProvider'
import CartItem from '../components/Cart/CartItem'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function Cart() {

    const {cartItems, minOrderValue, totalOrderValue, totalTax, deliveryChargeApplied, total} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0);
    });

    if(!cartItems.length) {
        return (
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700'>Cart is empty!</h2>
                <button onClick={() => {navigate('/collection')}} className='w-40 px-2 py-1 bg-black text-white cursor-pointer'>Go to Collection</button>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen w-full mb-10'>
            <button onClick={()=> {navigate(-1)}} className='hidden lg:block px-2 py-1 w-12 cursor-pointer '>
                <i class="fa-solid fa-angle-left text-gray-700 text-3xl  text-center"></i>
            </button>
            <div className='flex flex-col lg:flex-row w-full min-h-screen'>
                <div className='w-full lg:w-[70%] md:p-5 px-5 flex flex-col gap-2'>
                    <h1 className='text-[1.2rem] text-gray-700 font-semibold'>Cart Items</h1>
                    <div className='flex flex-col gap-2'>
                        {cartItems.length && cartItems.map((item) => {
                            return <CartItem item={item}/>
                        })}
                    </div>
                </div>

                <div className='flex flex-col w-full lg:w-[30%] lg:self-start lg:sticky lg:top-10 pb-5'>
                    <div className='w-[100%] p-5 flex flex-col gap-4 bg-white'>
                        <h1 className='text-[1.1rem] text-gray-700 font-semibold'>To Pay</h1>
                        <div className='flex flex-col justify-between border border-gray-500 min-h-40 md:min-h-50 p-4'>
                            <div>
                                <div className='flex justify-between text-gray-700'>
                                    <h1 className='font-semibold'>Total order value :</h1>
                                    <p>&#8377;{totalOrderValue}</p>
                                </div>
                                <div className='flex justify-between text-gray-700'>
                                    <h1>Tax :</h1>
                                    <p>&#8377;{totalTax.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between text-gray-700'>
                                    <h1>Delivery charge :</h1>
                                    <p>&#8377;{deliveryChargeApplied}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between text-gray-700'>
                                    <h1 className='font-semibold'>Total :</h1>
                                    <p>&#8377;{total.toFixed(2)}</p>
                                </div>
                                <div className={`${deliveryChargeApplied > 0? '': 'hidden'}`}>
                                    <p className='text-center text-[0.9rem] text-gray-700'>Add items worth &#8377;{minOrderValue - totalOrderValue} for free delivery!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5 gap-5'>
                        <button 
                            onClick={() => {navigate('/collection')}} 
                            className='active:bg-gray-400 px-3 py-1 md:px-5 md:py-2 bg-gray-300 cursor-pointer'
                        >
                            Shop More
                        </button> 
                        <button
                            onClick={() => {
                                navigate('/placeorder');
                            }} 
                            className='active:bg-gray-900 w-30 px-2 py-1.5 bg-black text-white cursor-pointer'
                        >
                            CheckOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart