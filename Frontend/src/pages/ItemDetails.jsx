import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppProvider';
import Loader from '../components/Loader.jsx';
import Reviews from '../components/Collection/Reviews.jsx';
import {ToastContainer, toast, Bounce} from 'react-toastify'
import { UserContext } from '../context/UserProvider';
import api from '../api.js';

const ItemDetails = () => {

  const params = useParams();
  const navigate = useNavigate();

  const {products,setProducts,cartItems, addToCart, submitAddToCart} = useContext(AppContext);
  const {user, setUser} = useContext(UserContext)

  const [currentImg, setCurrentImg] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(-1);
  const [deleting, setDeleting] = useState(false);
  const [deletebox, setDeletebox] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  if (!products || products.length < 1) {
    return <div className='h-screen w-screen'><Loader /></div>;
  }

  const product = products.find((item) => item._id === params.id);

  if(!product) {
    return <div className='h-screen w-screen'><Loader/></div>
  }

  const imgClickHandler = (index) => {
    setCurrentImg(index);
  }

  async function submitClickHandler(id, sizeIndex) {
    try {
      setAdding(true);
      if(!user) {
        toast('Login to continue!')
        navigate('/login');
        return;
      }
      if(sizeIndex < 0) {
        return toast('Select Size!')
      }
      if(product.available[sizeIndex].stock <= 0) {
        return toast('Out of stock!');
      }
      let item = cartItems.find((item) => item.productId === id && item.selectedSize.toUpperCase() === product.available[sizeIndex].size.toUpperCase())
      if(item) {
        if(item.quantity >= product.available[sizeIndex].stock) {
          return toast('Out of stock!')
        }
      } 
      await submitAddToCart(id, product.available[sizeIndex].size);
      navigate('/placeorder');
    } catch (error) {
      toast(error.message)
    } finally {
      setAdding(false);
    }
  }

  async function addClickHandler(id, sizeIndex) {
    try {
      setAdding(true);
      if(!user) {
        toast('Login to continue!')
        navigate('/login');
        return;
      }
      if(sizeIndex < 0) {
        return toast('Select Size!')
      }
      if(product.available[sizeIndex].stock <= 0) {
        return toast('Out of stock!');
      }
      let item = cartItems.find((item) => item.productId === id && item.selectedSize.toUpperCase() === product.available[sizeIndex].size.toUpperCase())
      if(item) {
        if(item.quantity >= product.available[sizeIndex].stock) {
          return toast('Out of stock!')
        }
      } 
      await addToCart(id, product.available[sizeIndex].size);
    } catch (error) {
      toast(error.message)
    } finally {
      setAdding(false);
    }
  }

  const productDeleteHandler = async(id) => {
    setDeleting(true);
    const result = await api.delete(`/products/${id}`);
    setProducts(products.filter((item) => item._id !== id));
    navigate('/collection');
    setDeleting(false);
  }
  
  let ratingSum = 0;
    product?.reviews.forEach(element => {
        ratingSum += element.rating;
    });

    let isVerified = user? user.orders.some((order) => {
      return order.cart.some((cart) => cart.productId === product._id);
    }) : false;

  return (
    
    <>
      <div className='flex lg:flex-row flex-col py-5 px-5 lg:px-0 gap-5 w-[100%] lg:h-[100vh]'>

        <button onClick={()=> {navigate(-1)}} className='hidden lg:block px-2 py-1 w-12 cursor-pointer '>
          <i class="fa-solid fa-angle-left text-gray-700 text-3xl  text-center"></i>
        </button>

        <div className='lg:block hidden w-34 h-[100%] scrollable-container overflow-y-auto'>
          <div className='image-container cursor-pointer w-30 h-fit bg-gray-300 flex flex-col gap-2 p-2'>
            {product.images.map((img, index) => {
              return <img onClick={()=>imgClickHandler(index)} key={index} className='w-30 object-cover' src={img.url} alt="" />
            })}
          </div>
        </div>

        <div className='main-image h-[100%] w-[80vw] md:w-[60vw] lg:w-[45vw] bg-gray-300 p-2 overflow-hidden'>
          <img className=' h-[100%] w-[100%] object-contain' src={product.images[currentImg].url} alt="" />
        </div>

        {/* for small and medium size screen */}

        <div className='lg:hidden h-[100%] w-fit scrollable-container bg-gray-300 overflow-x-auto'>
          <div className='image-container min-w-fit cursor-pointer flex gap-2 p-2'>
            {product.images.map((img, index) => {
              return <img onClick={()=>imgClickHandler(index)} key={index} className='w-20 md:w-30 object-cover' src={img.url} alt="" />
            })}
          </div>
        </div>

        <div className='product-details h-[100%] text-wrap lg:ml-5 flex flex-col gap-2'>
          <h1 className='text-2xl text-gray-700 font-semibold'>{product.title}</h1>
          <p className='text-[0.9rem] text-gray-700'>{product.description}</p>
          {product.reviews.length > 0 && <div className='flex gap-1 text-[0.9rem] text-gray-700'>
            <p>{(ratingSum/product.reviews.length).toFixed(1)} &#9733;</p>
            <p>({product.reviews.length})</p>
          </div>}
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-[1.2rem] text-gray-700'>&#8377;{product.price} </p>
            {sizeIndex < 0?  <p className='text-[.8rem] font-normal text-gray-700'>Select size</p>:
            <p className='text-[.8rem] font-normal text-gray-700'>{product.available[sizeIndex].stock > 10? 'In Stock': product.available[sizeIndex].stock > 3? 'Only few left!' :product.available[sizeIndex].stock > 0? `Only ${product.available[sizeIndex].stock} left!`: 'Out of stock!'}</p>}
          </div>
          <div className='flex gap-2 mt-5'>
            {product.available.map((sizeStock, index) => {
              return <div key={index} onClick={() => {setSizeIndex(index)}} className={`text-gray-700 text-[1.2rem] h-10 w-10 flex justify-center items-center bg-gray-200 ${sizeIndex === index? 'border-gray-700 border-2': 'border-gray-300'}  border-1 cursor-pointer`}><p>{sizeStock.size.toUpperCase()}</p></div>
            })}
          </div>
          <div className='flex gap-2 mt-2'>
            {user?.role === 'admin'?
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2'>
                <button onClick={() => {navigate(`/edit/${product._id}`)}} className='active:bg-gray-400 px-3 py-1 md:px-5 md:py-2 bg-gray-300 cursor-pointer'>Edit details</button>
                {!deleting? <button onClick={() => setDeletebox((prev) => !prev)} className='active:bg-gray-900 px-3 py-1 md:px-5 md:py-2 bg-black text-white cursor-pointer'>Delete Product</button>:
                <button className='px-3 py-1 md:px-5 md:py-2 bg-black text-white cursor-pointer'>Deleting</button>}
              </div>
              {deletebox && <div className='md:w-100 h-fit border-1 border-gray-400 p-2 flex flex-col'>
                <h2 className='text-[1.2rem] text-gray-700 font-semibold'>Confirm delete?</h2>
                <p className='text-[0.8rem] text-gray-700'>You will loose all performance of product. you can edit product if you want to change something!</p>
                <div className='flex gap-2 mt-2'>
                  <button onClick={() => setDeletebox(false)} className='px-3 py-1 bg-gray-300 cursor-pointer active:bg-gray-400'>Back</button>
                  <button onClick={() => {productDeleteHandler(product._id); setDeletebox(false)}} className='px-3 py-1 bg-red-700 text-white cursor-pointer active:bg-red-500'>Delete</button>
                </div>
              </div>}
            </div>
            :
            <>
            {!adding? <button onClick={() => addClickHandler(product._id, sizeIndex)} className='active:bg-gray-400 px-3 py-1 md:px-5 md:py-2 bg-gray-300 cursor-pointer'>Add To Cart</button>:
            <button className='active:bg-gray-400 px-3 py-1 md:px-5 md:py-2 bg-gray-300 cursor-pointer'>Adding</button>}
            <button onClick={() => submitClickHandler(product._id, sizeIndex)} className='active:bg-gray-900 px-3 py-1 md:px-5 md:py-2 bg-black text-white cursor-pointer'>Buy Now</button>
            </>
            }
          </div>

          <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          />
        </div>
      </div>
      <Reviews id={product._id} isVerified={isVerified} reviews={product.reviews}/>
      </>
  )
  
}

export default ItemDetails