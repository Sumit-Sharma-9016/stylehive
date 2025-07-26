import { v4 as uuidv4 } from 'uuid';
import {createContext, useContext, useEffect, useState } from "react";

import React from 'react'
import { toast } from "react-toastify";
import api from '../api.js'
import { UserContext } from './UserProvider.jsx';
import { useNavigate } from 'react-router-dom';


export const AppContext = createContext();

const AppProvider = ({children}) => {
    const {user, setUser} = useContext(UserContext)
    const [products, setProducts] = useState([]);
    const [searchBox, setSearchBox] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [placingOrder, setPlacingOrder] = useState(false);

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const deliveryCharge = 49;
    const minOrderValue = 999;
    const purchaseLimit = 10;

    const allTypes = ['Topwear', 'Bottomwear', 'Footwear', 'Innerwear', 'Festivewear', 'Partywear', 'Casualwear', 'Formalwear', 'Sportswear', 'Nightwear', 'Monsoonwear', 'Summerwear', 'Winterwear']
    const paymentMethods = [
        {
            url:'https://thumbs.dreamstime.com/b/money-transaction-vector-logo-icon-design-buying-cash-symbol-illustration-illustrations-152825421.jpg',
            name: 'Cash on Delivery'
        },
        {
            url:'https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp',
            name: 'UPI'
        },
        {
            url:'https://cdn.iconscout.com/icon/free/png-256/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png',
            name: 'Razorpay'
        }
    ]
    const status = ["Order Placed", "Order Processing", "Shipped", "Out for Delivery", "Delivered", "Order Cancelled"];
    

    useEffect(() => {
        if(user) {
            setCartItems(user.cart);
            setOrders(user.cart)
        }
    },[user])


// User cart functionalities
    async function addToCart(id, size) {
        try {
            const exist = cartItems.some((item) => {
                return item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase();
            });

            let newCart = []
    
            if(exist) {
                newCart = user.cart.map((item) =>{
                    if(item.productId === id && item.selectedSize.toUpperCase() === size.toUpperCase()) {
                        return {...item, quantity: item.quantity + 1};
                    }
                    return item;
                })
                setCartItems(newCart);
                await api.patch(`/user/${user._id}`, {cart: newCart});
                setUser({...user, cart: newCart});
                return;
            }
            setCartItems([...cartItems, {productId: id, quantity: 1, selectedSize: size.toUpperCase()}]);
            setUser({...user, cart: [...user.cart, {productId: id, quantity: 1, selectedSize: size.toUpperCase()}]})
            await api.patch(`/user/${user._id}`, { cart: newCart });
            return;
        } catch (error) {
            toast(error.message);
        }
    }

    async function submitAddToCart(id, size) {
        try {
            let newCart = [{productId: id, quantity: 1, selectedSize: size.toUpperCase()}]
            setCartItems(newCart);
            setUser({...user, cart: [{productId: id, quantity: 1, selectedSize: size.toUpperCase()}]})
            await api.patch(`/user/${user._id}`, { cart: newCart });
            return;
        } catch (error) {
            toast(error.message);
        }
    }

    async function placeOrderViaCOD(address) { 
        setPlacingOrder(true);   
        try {
            let orderCart = user.cart.map((item) => {
                let product = products.find((product) => product._id === item.productId);
                return {...item, price: product.price}
            });
            const timestamp = Date.now();
            const date = new Date(timestamp);
            const customFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
            let newOrder = {
                userId: user._id,
                cart: orderCart,
                bill: {
                    value: totalOrderValue,
                    tax: totalTax,
                    deliveryCharge: deliveryChargeApplied,
                    total
                },
                payment: {
                    mode: 'Cash on Delivery',
                    status: 'Pending'
                },
                status: 'Order Placed',
                address,
                date: customFormat
            }
            const result = await api.post('/orders/create', newOrder);
            delete newOrder.status;
            newOrder = {
                ...newOrder,
                orderId: result.data.orderId
            }
            await api.patch(`/user/${user._id}`, {cart:[], orders:[newOrder, ...user.orders], address: address});
            toast(result.data.message);
            setTimeout(async() => {
                getAllOrders();
                setUser({...user, cart:[], orders:[newOrder, ...user.orders], address: address});
                setCartItems([]);
                navigate('/orders');
            }, (2000));

            setPlacingOrder(false);
        } catch (error) {
            toast(error.message);
            setPlacingOrder(false);
        }
    }

    function calculateTotalOrderValue(cartItems) {
        let totalValue = 0;
        let product;
        for (const item of cartItems) {
            product = products.find((product) => product._id === item.productId);
            totalValue += product.price * item.quantity;
        }
        return totalValue;
    }

    function calculateTotalTax(cartItems) {
        let totalTax = 0;
        let product;
        for (const item of cartItems) {
            product = products.find((product) => product._id === item.productId);
            if(product.price <= 1000) {
                totalTax += product.price * 0.05 * item.quantity;
            } else {
                totalTax += product.price * 0.12 * item.quantity;
            }
        }
        return totalTax;
    }

    function calculateDeliveryCharge(totalOrderValue, minOrderValue) {
        if(totalOrderValue < minOrderValue) {
            return deliveryCharge;
        } else {
            return 0;
        }
    }

    function calculateTotal(totalOrderValue, totalTax, deliveryChargeApplied) {
        return totalOrderValue + totalTax + deliveryChargeApplied;
    }

    let totalOrderValue = calculateTotalOrderValue(cartItems);
    let totalTax = calculateTotalTax(cartItems);
    let deliveryChargeApplied = calculateDeliveryCharge(totalOrderValue, minOrderValue);
    let total = calculateTotal(totalOrderValue, totalTax, deliveryChargeApplied);
    
    useEffect(() => {
        totalOrderValue = calculateTotalOrderValue(cartItems);
        totalTax = calculateTotalTax(cartItems);
        deliveryChargeApplied = calculateDeliveryCharge(totalOrderValue, minOrderValue);
        total = calculateTotal(totalOrderValue, totalTax, deliveryChargeApplied);
    }, [cartItems]);

// Collection data update
    const getProducts = async() => {
        try {
            const result = await api.get('/products/get');

            if(result) {
                setProducts(result.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getProducts();  
    },[]);

// all orders data update
    const getAllOrders = async() => {
        try {
            const result = await api.get('/orders/get');
            setAllOrders(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrders();
    },[]) 

    return (
        <AppContext.Provider value={
            {
                products,
                setProducts,
                getProducts, 
                searchBox,
                setSearchBox,
                searchInput,
                setSearchInput,
                addToCart,
                submitAddToCart,
                placeOrderViaCOD, 
                cartItems, 
                setCartItems, 
                deliveryCharge, 
                minOrderValue, 
                purchaseLimit,
                totalOrderValue,
                totalTax,
                deliveryChargeApplied,
                total,
                orders,
                allOrders,
                setAllOrders,
                getAllOrders,
                allTypes,
                status,
                paymentMethods,
                placingOrder}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;
