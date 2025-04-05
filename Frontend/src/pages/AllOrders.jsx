import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider';
import AllOrder from '../components/AllOrders/AllOrder';

function AllOrders() {
  const [state, setState] = useState('all orders');
  const {allOrders = [], getAllOrders} = useContext(AppContext);
  const [filterBox, setFilterBox] = useState(false);
  const statusFilters = ["All Orders", "For Processing", "For Shipping", "For Delivery", "Out for Delivery", "Delivered", "Cancelled"];

  const [filteredOrders, setFilteredOrders] = useState(allOrders);

  useEffect(() => {
    if(!allOrders || !allOrders.length){
      getAllOrders();
    } else {
    
    const filtered = allOrders.filter((order) => {
        switch (state) {
            case 'All Orders': return true;
            case 'For Processing': return order.status === 'Order Placed';
            case 'For Shipping': return order.status === 'Order Processing';
            case 'For Delivery': return order.status === 'Shipped';
            case 'Out for Delivery': return order.status === 'Out for Delivery';
            case 'Delivered': return order.status === 'Delivered';
            case 'Cancelled': return order.status === 'Order Cancelled';
            default: return true;
        }
    });

      setFilteredOrders([...filtered]); // ✅ Create a new array for reliable updates
    }  
  }, [state, allOrders]);

  if(!allOrders || !allOrders.length) {
    return <div className='w-full h-[90vh] text-gray-700 font-semibold flex items-center justify-center'>Loading...</div>
  }
  return (
    <div className='md:px-5 w-full'>
      <div className='flex w-full px-2 justify-between items-center relative'>
        <h1 className='font-semibold text-0.9rem  md:text-[1rem] lg:text-[1.2rem] text-gray-700'>Orders</h1>
        <h2 onClick={() => {setFilterBox((prev) => !prev)}} className='select-none cursor-pointer font-semibold text-[0.8rem]  md:text-[0.9rem] lg:text-[1rem] text-gray-700'>FILTER : {state.toUpperCase()}</h2>
        {filterBox && <div className='select-none absolute z-1 top-9 right-0 min-h-5 h-fit w-40 bg-gray-100 border border-gray-400 shadow shadow-gray-400'>
          {statusFilters.map((filter) => {
            return <li onClick={(e) => {setState(e.target.innerText); setFilterBox(false)}} className='cursor-pointer list-none px-2 py-1 font-medium text-[0.8rem]  md:text-[0.9rem] lg:text-[1rem] text-gray-700'>{filter}</li>
          })}
        </div>}
      </div>
      <div onClick={() => {setFilterBox(false)}} className='py-2 w-full flex flex-col gap-5'>
          {filteredOrders.map((order) => (
              <AllOrder key={order._id} order={order}/>
          ))}
      </div>
    </div>
  )
}

export default AllOrders