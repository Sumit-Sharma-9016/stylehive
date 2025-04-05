import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const {user, fetchUser} = useContext(UserContext);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if(user) {
            setName(user.name);
            setAddress(user.address);
        }
    },[user]);

    const saveChangesHandler = async() => {
        if(!name) {
            return toast('Fill the name!');
        }
        try {
            const result = await api.patch(`/user/${user._id}`, {name, address});
            if(result.data.success) {
                fetchUser();
                return toast('Saved Changes!');
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    if(!user) {
        return (
            <div className='w-full h-[80vh] flex flex-col items-center justify-center gap-2'>
                <h2 className='text-gray-700 '>User is not logged in!</h2>
                <button onClick={() => {navigate('/login')}} className='w-40 px-2 py-1 bg-black text-white cursor-pointer'>Login now</button>
            </div>
        )
    }
    return (
        <div className='flex items-center justify-center md:p-5'>
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
            <div className='relative xl:min-h-[80vh] min-h-[50vh] h-fit w-screen md:w-[60%] lg:w-[50%] xl:w-[30%] bg-gray-100'>
                <div className='absolute right-5 top-5 flex justify-end text-gray-700'>
                    <i onClick={() => navigate(-1)} className="fa-solid fa-xmark text-2xl cursor-pointer opacity-50"></i>
                </div>
                <h1 className='text-3xl m-6 font-bold text-gray-700 text-center'>Profile</h1>
                <div className='flex flex-col items-center gap-2'>
                    <div className='h-20 w-20 flex justify-center items-center border border-gray-700 bg-white rounded-full'>
                        <i className="fa-regular fa-user text-2xl text-gray-500"></i>
                    </div>
                    <input spellCheck={false} className='text-center text-[1.2rem] text-gray-700 outline-none' required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col px-5 py-2 gap-2'>
                    <textarea placeholder='Address...' spellCheck={false} style={{ resize: 'none' }} className='h-30 w-full outline-none border bg-white border-gray-300 p-2 text-gray-700' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
                <div className='flex flex-col items-center gap-3 text-gray-700 p-5'>
                    <div className='flex w-full justify-around'>
                        <button onClick={() => navigate('/orders')} className='h-10 w-30 cursor-pointer border border-gray-300 bg-white'>Orders</button>
                        <button onClick={() => navigate('/cart')} className='h-10 w-30 cursor-pointer border border-gray-300 bg-white'>Cart</button>
                    </div>
                    <div className='flex w-full justify-around'>
                        <button onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                        window.location.reload();
                        toggleMiniMenu();}} 
                        className='h-10 w-30 cursor-pointer border border-gray-300 bg-white'>Logout</button>
                        <button onClick={saveChangesHandler} className='h-10 w-30 cursor-pointer border border-gray-300 bg-white'>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile