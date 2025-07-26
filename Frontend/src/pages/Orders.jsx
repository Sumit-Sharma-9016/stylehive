import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppProvider'
import { useNavigate } from 'react-router-dom';
import Order from '../components/Orders/Order';
import { UserContext } from '../context/UserProvider';

function Orders() {

    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setOrders(user.orders);
        }
    },[user])

    if(!orders) {
        return (
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700'>Loading...</h2>
            </div>
        )
    }

    if(!orders.length) {
        return (
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700'>Not a single order yet!</h2>
                <button onClick={() => {navigate('/collection')}} className='w-40 px-2 py-1 bg-black text-white cursor-pointer'>Go to Collection</button>
            </div>
        )
    }

    return (
        <div className='flex w-full min-h-screen'>
            <button onClick={()=> {navigate(-1)}} className='hidden lg:block px-2 py-1 w-12 cursor-pointer '>
                <i class="fa-solid fa-angle-left text-gray-700 text-3xl  text-center"></i>
            </button>
            <div className='flex flex-col gap-2 md:p-5 px-5 w-full'>
                <h1 className='text-[1.2rem] text-gray-700 font-semibold'>Orders</h1>
                <div className='flex flex-col gap-5 w-full'>
                    {orders.map((order) => {
                        return <Order order={order}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Orders