import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider.jsx'
import CartItem from '../components/Cart/CartItem';
import { useNavigate } from 'react-router-dom';
import User from '../../../backend/models/UserModel.js';
import { UserContext } from '../context/UserProvider.jsx';
import { toast, ToastContainer, Bounce } from 'react-toastify';

function PlaceOrder() {
    const {cartItems, products, getProducts, total, paymentMethods, placeOrderViaCOD, placingOrder} = useContext(AppContext);
    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('');

    function placeOrderHandler() {
        if(!address) {
            return toast('Please fill address!')
        }
        if(address.length <= 30) {
            return toast('Minimum 30 character for address!')
        }
        switch(paymentMethod) {
            case 'Cash on Delivery':{
                placeOrderViaCOD(address);
            }
        }
    }

    if(!cartItems || !cartItems.length) {
        return (
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700'>Cart is empty!</h2>
                <button onClick={() => {navigate('/collection')}} className='w-40 px-2 py-1 bg-black text-white cursor-pointer'>Go to Collection</button>
            </div>
        )
    }

    return (
        <div className='flex min-h-screen w-full mb-10'>
            <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />
            <button onClick={()=> {navigate(-1)}} className='hidden lg:block px-2 py-1 w-12 cursor-pointer '>
                <i class="fa-solid fa-angle-left text-gray-700 text-3xl  text-center"></i>
            </button>
            <div className='flex flex-col lg:flex-row w-full h-fit'>
                <div className='w-full lg:w-[50%] md:p-5 px-5 flex flex-col gap-2'>
                    <h1 className='text-[1.2rem] text-gray-700 font-semibold'>Items</h1>
                    <div className='flex flex-col gap-2'>
                        {cartItems.length && cartItems.map((item) => {
                            let product = products.find((product) => product._id === item.productId)
                            return (
                                <div onClick={() => {navigate('/cart')}} className='w-100% p-2 bg-gray-100 cursor-pointer flex gap-3'>
                                    <div  onClick={() => {navigate(`/item/${item.productId}`)}} className='w-10 h-10 md:w-15 md:h-15 bg-gray-100'>
                                        <img className='w-10 h-10 md:w-15 md:h-15 object-contain rounded-md m-auto' src={product.images[0].url} alt="" />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='font-semibold text-gray-700 text-[0.8rem] md:text-[1rem]'>{product.title}</h1>
                                        <div className='flex gap-3 w-full h-5 items-center'>
                                            <p className={`h-3 w-3 md:h-5 md:w-5 text-[0.8rem] flex justify-center items-center bg-gray-200 border-1 cursor-pointer`}>{item.selectedSize.toUpperCase()}</p>
                                            <h1 className='text-[0.7rem] md:text-[0.8rem] text-gray-700 font-semibold flex gap-2 items-center'>&#8377;{product.price*item.quantity}</h1>
                                            <p className='text-center text-gray-700 text-[0.6rem] md:text-[0.8rem]'>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex justify-between items-center '>
                        <h1 className='text-[1.2rem] text-gray-700 font-semibold'>Address</h1>
                    </div>
                    <textarea
                        spellCheck={false}
                        id="description"
                        style={{ resize: 'none' }}
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        placeholder="Enter the delivery address here..."
                        className="w-full h-30 p-2 text-[0.8rem] md:text-[1rem] text-gray-900 outline-none border border-gray-400"
                    />
                </div>
                <div className='w-full md:w-[50%] p-5'>
                    <div className='flex flex-col gap-2'>
                         
                        <h1 className='font-semibold text-gray-700'>Select Payment Method :</h1>
                        <div className='flex gap-2 md:gap-4 w-fit'>
                            {paymentMethods.map((method, index) => {
                                return (
                                    <div key={index} onClick={() => {setPaymentMethod(method.name)}} className={`flex items-center justify-center gap-1 cursor-pointer ${paymentMethod === method.name? 'border-gray-700': 'border-gray-300'} border w-fit md:min-w-30 px-3 py-1`}>
                                        <img src={method.url} className='h-5 w-5 md:h-8 md:w-8' alt="" />
                                        <h1 className='text-[0.7rem] md:text-[1rem] text-nowrap'>{method.name}</h1>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='mt-5'>
                            <h1 className='flex text-[1rem] items-center gap-2 text-gray-700 font-semibold'>ToPay : &#8377;{total}<p className='text-[0.9rem] font-medium text-gray-500'>(including tax)</p></h1>
                        </div>
                        {paymentMethod === 'Cash on Delivery'?
                            <div className='flex flex-col gap-6'>
                                <p className='text-[0.8rem] text-gray-700'>(You can pay via Cash or via UPI on delivery!)</p>
                                <div className='flex gap-5'>
                                    <button 
                                        onClick={() => {navigate('/cart')}} 
                                        className='active:bg-gray-400 px-3 py-1 md:px-5 md:py-2 bg-gray-300 cursor-pointer'
                                    >
                                       Go to Cart
                                    </button> 
                                    {cartItems.length && <div>
                                        {!placingOrder? <button
                                        onClick={() => {
                                           placeOrderHandler();
                                        }} 
                                        className='active:bg-gray-900 w-30 px-2 py-1.5 bg-black text-white cursor-pointer'
                                        >
                                        Place Order
                                        </button> : <button
                                        className='active:bg-gray-900 w-30 px-2 py-1.5 bg-black text-white cursor-pointer'
                                        >
                                        Placing
                                        </button>}
                                        </div>
                                    }
                                </div>
                            </div>: paymentMethod === 'UPI'?
                            <div>
                                <h1 className='text-gray-700'>UPI is under maintainance!</h1>
                            </div>: paymentMethod === 'Razorpay'?
                            <div>
                                <h1 className='text-gray-700'>Razorpay is under maintainance!</h1>
                            </div>:
                            <div>
                                <h1 className='text-gray-700'>Select a Payment Method</h1>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PlaceOrder