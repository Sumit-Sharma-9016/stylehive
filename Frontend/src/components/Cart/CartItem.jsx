import React, { useContext, useEffect } from 'react'
import Loader from '../Loader'
import { AppContext } from '../../context/AppProvider';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import api from '../../api';

function CartItem({item}) {

    const {products, cartItems, setCartItems, purchaseLimit} = useContext(AppContext);
    const {user, setUser} = useContext(UserContext);

    let product = products.find((product) => product._id === item.productId)

    useEffect(() => {
        if(products) {
            product = products.find((product) => product._id === item.productId)
        }
    },[products])

    const navigate = useNavigate();

    const removeItem = async(id, size) => {
        try {
            let newCart = cartItems.filter((item) => item.productId != id || item.selectedSize.toUpperCase() != size.toUpperCase());
            setCartItems(newCart);
            await api.patch(`/user/${user._id}`, {cart: newCart});
            setUser({...user, cart: newCart});
        } catch (error) {
            toast(error.message);
        }
    }

    async function handleQuantityMinus(id, size) {
        try {
            if(cartItems.find((item) => item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()).quantity <= 1) {
                removeItem(id, size);
                return;
            }
            let newCart = user.cart.map((item) => {
                if(item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()) {
                    return {...item, quantity: item.quantity-1};
                } else {
                    return item;
                }
            });
            await api.patch(`/user/${user._id}`, {cart: newCart});
            setCartItems(newCart);
            setUser({...user, cart: newCart});
        } catch (error) {
            toast(error.message);
        }

    }
    async function handleQuantityPlus(id, size) {
        try {
            if(cartItems.find((item) => item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()).quantity >= purchaseLimit) {
                toast('Limit exceed!')
                return;
            }
            let productStock = products.find((item) => item._id === id).available.find((sizes) => sizes.size === size).stock;
            if(cartItems.find((item) => item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()).quantity >= productStock) {
                toast('Out of stock!');
                return;
            }
            let newCart = user.cart.map((item) => {
                if(item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()) {
                    return {...item, quantity: item.quantity+1};
                } else {
                    return item;
                }
            });
            await api.patch(`/user/${user._id}`, {cart: newCart});
            setCartItems(newCart);
            setUser({...user, cart: newCart});
        } catch (error) {
            
        }
    }
    
    if(!product) {
        return;
    }
    
    return (
        <>
        <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                  transition={Bounce}
                  />
        <div className='w-100% p-2 bg-gray-100 cursor-pointer flex gap-3'>
            <div  onClick={() => {navigate(`/item/${item.productId}`)}} className='w-20 h-20 md:w-30 md:h-30 bg-gray-100'>
                <img className='w-20 h-20 md:w-30 md:h-30 object-contain rounded-md m-auto' src={product.images[0].url} alt="" />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex flex-col overflow-hidden'>
                    <h1 className='font-semibold text-gray-700 text-[0.8rem] md:text-[1rem]'>{product.title}</h1>
                    <p className='hidden md:block text-[0.8rem] w-100 text-gray-700 text-base/tight text-nowrap'>{product.description}</p>
                    <div className='flex gap-4 mt-1 md:mt-3 text-gray-700 text-[0.9rem]'>
                        <p className={`h-5 w-5 md:h-7 md:w-7 flex justify-center items-center bg-gray-200 border-1 cursor-pointer`}>{item.selectedSize.toUpperCase()}</p>
                        <p className='flex items-center'>
                            <button onClick={() => {handleQuantityMinus(item.productId, item.selectedSize)}} className='h-5 w-5 md:h-7 md:w-7 cursor-pointer bg-gray-200 hover:border-1 border-gray-300 active:bg-gray-300'><i class="fa-solid fa-minus"></i></button>
                            <p className='text-center text-[0.9rem] md:text-[1.2rem] w-10'>{item.quantity}</p>
                            <button onClick={() => {handleQuantityPlus(item.productId, item.selectedSize)}} className='h-5 w-5 md:h-7 md:w-7 cursor-pointer bg-gray-200 hover:border-1 border-gray-300 active:bg-gray-300'><i class="fa-solid fa-plus"></i></button>
                        </p>
                    </div>
                </div>
                <h1 className='text-[0.9rem] md:text-[1rem] text-gray-700 font-semibold flex gap-2 items-center'>&#8377;{product.price*item.quantity}<p className='font-light text-[0.8rem]'>({product.price} &times; {item.quantity})</p></h1>
            </div>
        </div>
        </>
    )
}

export default CartItem