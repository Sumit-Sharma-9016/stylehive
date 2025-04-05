import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppProvider';
import OrderItem from './OrderItem';
import { UserContext } from '../../context/UserProvider';
import api from '../../api';

function Order({order}) {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("Loading...");

    const getStatus = async(req, res) => {
        const result = await api.get(`orders/${order.orderId}`);
        setStatus(result.data.data.status);
    }

    useEffect(() => {
        if(user) {
            setOrders(user.orders);
        }
        getStatus();
    },[user]);

    if(!orders.length) {
        return (
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700'>Not a single order yet!</h2>
                <button onClick={() => {navigate('/collection')}} className='w-40 px-2 py-1 bg-black text-white cursor-pointer'>Go to Collection</button>
            </div>
        )
    }

    return (
    <div className='group w-[100%] relative'>
        <div className='md:w-[80%] lg:w-[70%] bg-gray-100 lg:min-h-50 flex flex-col overflow-hidden'>
            <div className='h-12 w-full flex font-semibold text-gray-700 bg-gray-200 text-[0.9rem] md:text-[1rem] items-center justify-between px-2 py-1'>
                <p>Status : {status}</p>
                <p>Total : &#8377;{order.bill.total}</p>
            </div>
            <div className='flex flex-col gap-1 min-h-26'>
                {order.cart.map((product) => {
                    return <OrderItem cartItem={product}/>
                })}
            </div>
            <div className='flex items-center justify-center md:justify-between p-2 md:p-5'>
                <div className='text-gray-700 hidden md:block text-[0.9rem] w-[70%] text-nowrap overflow-hidden'>Address : {order.address}</div>
                
                <div className='text-gray-700 text-[0.8rem] md:text-[0.9rem]'>Date : {order.date}</div>
            </div>
        </div>
        <div className='group-hover:opacity-100 transition-all duration-300 opacity-0 absolute top-0 right-10 w-[25%] flex-col gap-4 bg-white'>
            <div className='flex flex-col justify-between border border-gray-500 min-h-40 md:min-h-50 p-4'>
                <div>
                    <div className='flex justify-between text-gray-700'>
                        <h1 className='font-semibold'>Total order value :</h1>
                        <p>&#8377;{order.bill.value}</p>
                    </div>
                    <div className='flex justify-between text-gray-700'>
                        <h1>Tax :</h1>
                        <p>&#8377;{order.bill.tax.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between text-gray-700'>
                        <h1>Delivery charge :</h1>
                        <p>&#8377;{order.bill.deliveryCharge}</p>
                    </div>
                </div>
                <div className='flex justify-between text-gray-700'>
                    <h1 className='font-semibold'>Total :</h1>
                    <p>&#8377;{order.bill.total}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order