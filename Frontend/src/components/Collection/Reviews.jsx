import React, {useContext, useEffect, useState } from 'react'
import Rating from 'react-rating-stars-component'
import ReactStars from 'react-rating-stars-component'
import { UserContext } from '../../context/UserProvider';
import api from '../../api';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { AppContext } from '../../context/AppProvider';

function Reviews({id, reviews, isVerified}) {
    const {user} = useContext(UserContext);
    const {getProducts} = useContext(AppContext);
    const [reviewBox, setReviewBox] = useState('false');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(user) {
            setUsername(user.name);
        }
    },[user])

    const postReviewHandler = async() => {
        if(!username || !rating > 0 || !message.length) {
            return toast('Fill the details!');
        }

        try {
            let review = {userId: user._id, isVerified, username, rating, message};
            await api.patch(`/products/reviews/${id}`, review);
            setRating(0);
            setMessage('');
            setReviewBox((prev) => !prev);
            getProducts();
            return;
        } catch (error) {
            return toast(error.message);
        }
    }

  return (
    <div className='flex flex-col gap-2 p-5'>
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
        <div className='flex items-center not-sm:justify-between gap-4 md:gap-5 mb-5'>
            <h1 className='text-[1.2rem] md:text-2xl font-semibold text-gray-700 '>Reviews</h1>
            <p className='text-gray-700 not-md:text-[0.9rem]'> {isVerified? <><i class="fa-solid fa-circle-check"></i> Verified Buyer</>: 'Unverified'} </p>
            <button onClick={() => {setReviewBox((prev) => !prev); setMessage(''); setUsername(user?.name); setRating(0)}} className='h-8 w-30 md:w-40 text-gray-700 md:text-[1.1rem] text-[0.9rem] border border-gray-300 bg-gray-100 cursor-pointer'>{reviewBox ? <><i class="fa-solid fa-pencil"></i> Write Review</>:<><i class="fa-solid fa-xmark"></i> close</>}</button>
        </div>
        
        
        <div className={`${reviewBox? 'hidden': 'flex'} w-full md:w-[70%] flex-col gap-2 bg-gray-100 h-fit p-2 md:p-5 text-gray-700`}>
            <div className='flex items-center gap-2'>
                <input spellCheck={false} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='h-10 w-40 md:w-50 border p-2 border-gray-300 outline-none'/>
                <ReactStars
                    size={25}
                    count={5}
                    isHalf={false}
                    value={rating}
                    color="gray"
                    activeColor="black"
                    required={true}
                    onChange={newValue => {setRating(newValue); console.log(newValue)}}
                />
            </div>
            <div className='flex not-md:flex-col gap-2 h-30 md:h-20'>
                <textarea spellCheck={false} value={message} onChange={(e) => {setMessage(e.target.value)}} className='h-30 md:h-20 w-full md:w-[70%] border p-2 border-gray-300 outline-none' style={{resize:'none'}} placeholder='Write message...'></textarea>
                <button onClick={postReviewHandler} className='h-10 w-35 md:self-end text-gray-700 text-[1rem] border border-gray-300 bg-gray-100 cursor-pointer'>Post Review</button>
            </div>
        </div>

        {!reviews.length? <div className='text-center text-gray-700 mt-5'>No Reviews</div> :
        <div className='grid md:grid-cols-2 gap-2 md:gap-3 lg:gap-5'>
        {reviews.map((review) => {
            return (
                <div className='bg-gray-100 min-h-20 px-3 py-1'>
                    <span className='flex gap-5'>
                        <h1 className='font-semibold items-center text-[1.1rem] md:text-[1.2rem] text-gray-700'>{review.username} &nbsp;{review.isVerified? <i className="fa-solid fa-circle-check text-[0.8rem] opacity-40"></i>:''}</h1>
                        <Rating
                            count={5}
                            value={review.rating}
                            size={18}
                            edit={false}
                            activeColor="#000"
                        />
                    </span>
                    <p className='text-gray-800 text-wrap'>{review.message}</p>
                </div>
            )
        })}
        </div>
        }
    </div>
  )
}

export default Reviews