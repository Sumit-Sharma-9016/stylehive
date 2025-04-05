import React, { useContext, useEffect, useState } from 'react'
import AllOrderItem from './AllOrderItem'
import { UserContext } from '../../context/UserProvider';
import { AppContext } from '../../context/AppProvider';
import api from '../../api';

const AllOrder = ({order}) => {
    const {status,allOrders, setAllOrders} = useContext(AppContext);
    const {users, getUser} = useContext(UserContext);
    const [person, setPerson] = useState({})
    const [currentStatus, setCurrentStatus] = useState(order.status);
    const [statusBox, setStatusBox] = useState(false);
    const [statusChanging, setStatusChanging] = useState(false);

    useEffect(() => {
        if(users)
        setPerson(users.find((user) => user._id === order.userId));
    }, [users]);
    
    const statusChangeHandler = async (statusName) => {
        try {
            setStatusChanging(true);

            await api.patch(`/orders/${order._id}`, { status: statusName });
    
            const { data: updatedOrders } = await api.get("/orders/get");
            setAllOrders(updatedOrders);
    
        } catch (error) {
            console.error("Error updating order status:", error);
        } finally {
            setStatusChanging(false);
        }
    };
    
    
    const nextOrderStatusHandler = (e) => {
        e.preventDefault();
        if(currentStatus === 'Delivered') {
            return;
        }
        let nextStatus;
        status.forEach((element, index) => {
            if(element === currentStatus) {
                nextStatus = status[index+1];
            }
        });
        statusChangeHandler(nextStatus);
    }
  return (
    <div className='group w-full relative'>
        <div className='w-full bg-gray-100 lg:min-h-50 flex flex-col overflow-hidden'>
            <div className='h-12 w-full flex font-semibold text-gray-700 bg-gray-200 text-[0.9rem] md:text-[1rem] items-center justify-between px-2 md:px-4 lg:px-5 py-1'>
                <div className='flex w-full md:w-75 justify-between'>
                    {!statusChanging? <div onClick={() => {setStatusBox((prev) => !prev)}} className='flex items-center justify-center relative select-none'>Status : <p className='ml-2 cursor-pointer border-b border-b-gray-400'>{currentStatus}</p>
                        {statusBox && <div className='absolute top-9 left-14 min-h-5 h-fit w-40 bg-gray-100 border border-gray-400 shadow shadow-gray-400'>
                            {status.map((stat, index) => {
                                return <li key={index} onClick={(e) => statusChangeHandler(e.target.innerText)} name={stat} className='cursor-pointer list-none px-2 py-1 font-medium text-[0.9rem] md:text-[1rem]'>{stat}</li>
                            })}
                        </div>}
                    </div>: <div className='flex items-center justify-center relative select-none'>Status : <p className='ml-2 cursor-pointer border-b border-b-gray-400'>Changing</p></div>}
                    {currentStatus != 'Delivered'? <button onClick={nextOrderStatusHandler} className='cursor-pointer px-2 py-1 font-medium text-gray-700 border border-gray-400 bg-gray-300 active:bg-gray-400'>Next Status</button>:
                    <button className='cursor-pointer px-2 py-1 font-medium text-white bg-green-700'>Completed</button>}
                </div>
                <p className='hidden lg:flex'>Total : &#8377;{order.bill.total}</p>
            </div>
            <div onClick={() => {setStatusBox(false)}} className='flex flex-col gap-1 min-h-26'>
                {order.cart.map((item,index) => {
                    return <AllOrderItem key={index} item={item}/>
                })}
            </div>
            <div className='flex flex-col gap-1 px-5'>
                <div className='hidden lg:flex text-[0.9rem] justify-between text-gray-700 gap-10 py-2'>
                    <h3>Orderer : {person?.name}</h3>
                    <h3>Payment Mode : {order.payment.mode}</h3>
                    <h3>Payment Status : {order.payment.status}</h3>
                    <h3 className='text-gray-700 text-[0.8rem] md:text-[0.9rem]'>Date : {order.date}</h3>
                    <div className='text-gray-700 text-[0.9rem] w-75 text-nowrap overflow-hidden'>Address : {order.address}</div>
                </div>
                <div className='flex flex-col lg:hidden text-[0.9rem] justify-between text-gray-700 gap-1 py-2'>
                    <div className='flex flex-col not-md:gap-1 md:flex-row md:justify-between'>
                        <h3>Orderer : {person?.name}</h3>
                        <h3>Payment Mode : {order.payment.mode}</h3>
                    </div>
                    <div className='flex flex-col not-md:gap-1 md:flex-row md:justify-between'>
                        <h3>Payment Status : {order.payment.status}</h3>
                        <h3 className='text-gray-700 text-[0.8rem] md:text-[0.9rem]'>Date : {order.date}</h3>
                    </div>
                    <div className='text-gray-700 text-[0.9rem] w-75 text-nowrap overflow-hidden'>Address : {order.address}</div>
                </div>
            </div>
        </div>
        <div className='group-hover:opacity-100 not-md:hidden transition-all duration-300 opacity-0 absolute top-0 right-0 w-[25%] flex-col gap-4 bg-white'>
            <div className='flex flex-col justify-between border border-gray-500 min-h-40 md:min-h-30 p-4'>
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

export default AllOrder