import React, { useContext, useState} from 'react'
import api from '../api.js';
import {toast, ToastContainer, Bounce} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider.jsx';

function Login() {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const {fetchUser} = useContext(UserContext)
    const handleSubmit = async(e) => {
        setSubmitting(true)
        e.preventDefault();
        
        const userData = {
            name,
            email,
            password
        }

        try {
            let response;
            if(currentState === 'Sign Up') {
                response = await api.post('/user/register', userData);
            } else {
                response = await api.post('/user/login', userData);
            }

            if(response.data.message) {
                toast(response.data.message);
            }

            if(response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast('Login successful!');
                fetchUser();
                navigate('/collection');
            } else {
                toast('Something went wrong!');
            };
        } catch (error) {
            toast(error.message);
        }
        setSubmitting(false);
    }   

  return (
    <div className='m-auto w-80 mt-10 rounded-md'>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />
        <h1 className='text-center text-2xl font-semibold text-gray-700 mb-5'>{currentState}</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            {currentState === 'Sign Up' && <input className='w-full p-2 h-10 border-1 border-gray-300' type="text" required name='name' value={name} onChange={(e)=> {setName(e.target.value)}} placeholder='Name' />}
            <input className='w-full p-2 h-10 border-1 border-gray-300' type="email" required name='email' value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder='Email' />
            <input className='w-full p-2 h-10 border-1 border-gray-300' type="password" required name='password' value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder='Password' />
            <button disabled={submitting} type='submit' className='p-2 bg-black text-white mt-2 cursor-pointer text-[1.1rem]'>{currentState}</button>
            <div className='flex justify-between cursor-pointer text-gray-700 mt-1'>
                <p>Forgot password?</p>
                <p onClick={() => {
                    currentState==='Login'? setCurrentState('Sign Up'): setCurrentState('Login')
                }}>{currentState==='Login'? 'Register':'Login'}</p>
            </div>
        </form>
    </div>
  )
}

export default Login