import React, { useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email) => {
    if(email.includes(' ')) {
      toast("Email contains blank space");
      return false;
    }
    if(!email.trim().includes('@')) {
      toast("Email must contain '@' symbol");
      return false;
    }
    if(email.charAt(email.length-1) === '@') {
      toast("Second part after '@' is missing");
      return false;
    }
    return true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(!name || !email || !message) {
      return toast('Fill details!');
    }
    if(!isValidEmail(email)) {
      return;
    }
    const subject = encodeURIComponent("Contact Us Inquiry");
    const body = encodeURIComponent(
      `Hello,\n\nMy name is ${name}.\n\n${message}\n\nYou can reach me at: ${email}`
    );
    window.location.href = `mailto:stylehive.business.999@gmail.com?subject=${subject}&body=${body}`
    setName('');
    setEmail('');
    setMessage('');
  }
  return (
    
    <div className='md:p-10 flex xl:flex-row flex-col md:items-center not-md:gap-10 xl:gap-5 md:gap-10'>
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
      <div className="left px-8">
        <div className="upper w-80">
          <h1 className='text-4xl font-bold text-gray-700'>Contact Us</h1>
          <p className='text-gray-700 mt-4 '>Call or fill this form to send an email to us so stylehive can solve you problem.</p>
          <p className='text-gray-700 mt-4 '>stylehive.business.999@gmail.com</p>
          <p className='text-gray-700 mt-4 '>9016930637</p>
        </div>
        <div className="bottom w-full mt-10 flex md:flex-row flex-col justify-center gap-5">
          <div className="w-full lg:w-60 md:w-55">
            <h1 className='text-[1.2rem] not-lg:text-[1.1rem] font-bold text-gray-700'>Customer Support</h1>
            <p className='text-[0.9rem] text-gray-700'>Our team is available around the clock to address any concerns or queries you may have.</p>
          </div>
          <div className="w-full lg:w-60 md:w-55">
            <h1 className='text-[1.2rem] font-bold text-gray-700'>Feedback and Suggestions</h1>
            <p className='text-[0.9rem] text-gray-700'>We value your feedback and are continuously working to improve stylehive. Your input is crucial in shaping the future of stylehive.</p>
          </div>
          <div className="w-full lg:w-60 md:w-55">
            <h1 className='text-[1.2rem] font-bold text-gray-700'>Business Inquiries</h1>
            <p className='text-[0.9rem] text-gray-700'>For business related questions or inquiry contact us at stylehive.business.999@gmail.com.</p>
          </div>
        </div>
      </div>
      <div className="right xl:w-full md:w-[80%] p-3 flex flex-col items-center ">
        <h1 className='text-2xl font-bold text-gray-700'>Get in Touch</h1>
        <p className='text-[0.9rem] text-gray-700'>You can reach us anytime</p>
        <div className='flex flex-col gap-2 mt-5 w-full items-center'>
        <input spellCheck={false} value={name} onChange={(e) => setName(e.target.value)} className='text-gray-700 h-10 w-[80%] p-2 outline-none border border-gray-300' type="text" required placeholder='Full name'/>
        <input spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} className='text-gray-700  h-10 w-[80%] p-2 outline-none border border-gray-300' type="email" required placeholder='example@gmail.com' />
        <textarea spellCheck={false} value={message} onChange={(e) => setMessage(e.target.value)} style={{ resize: 'none' }} className='text-gray-700 scrollable-container h-40 w-[80%] p-2 outline-none border border-gray-300' minLength={50} placeholder='Type message...'></textarea>
        <button onClick={submitHandler} className='cursor-pointer m-5 h-10 w-50 bg-black text-white'>Send Email</button>
        </div>
      </div>
    </div>
  )
}

export default Contact