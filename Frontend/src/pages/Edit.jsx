import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer, Bounce } from 'react-toastify';
import api from '../api.js'
import { AppContext } from '../context/AppProvider.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {

    const params = useParams();
    const navigate = useNavigate();
    const {products,setProducts, getProducts} = useContext(AppContext);

  const {allTypes} = useContext(AppContext)

  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [categoryBox, setCategoryBox] = useState(false);
  const [size, setSize] = useState('');
  const [sizeBox, setSizeBox] = useState(false);
  const [stock, setStock] = useState();
  const [available, setAvailable] = useState([]);
  const [type, setType] = useState([]);
  const [typeBox, setTypeBox] = useState(false)
  const [tag, setTag] = useState('');
  const [filtered, setFiltered] = useState(allTypes);
  const [prevImages, setprevImages] = useState([])

    useEffect(() => {
        if(!products || !products.length) return;
        window.scrollTo(0,0);
        const product = products?.find((item) => item._id === params.id);
        if(!product) {
            toast('Product not found!');
            setTimeout(() => {
                navigate(`/collection`);
            }, 1000)
        }
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setType(product.type);
        setAvailable(product.available);
        setprevImages(product.images);
    },[products])

  const [loading, setLoading] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL'];

  const imageOnChangeHandler = (e) => {
    if(images.length >= 6) {
      toast('Limit exceed!')
      return;
    }
    for(let i = 0; i < e.target.files.length; i++) {
      setImages([...images, e.target.files[i]]);
    }
  }

  const imageDeleteHandler = (name, idx) => {
    setImages(images.filter((image, index) => image.name != name || index !=idx ));
  }

  const tagDeleteHandler = (idx) => {
    setType(type.filter((tag, index) => idx!= index));
  }

  const availableAddHandler = (e) => {
    e.preventDefault();
    if(!sizes.includes(size) || stock < 0 || !stock) {
      return toast('Invalid data entry!')
    }
    if(available.some(obj => obj.size === size)) {
      setAvailable(available.map((sizes) => {
        if(sizes.size.toUpperCase() === size.toUpperCase()) {
          console.log(typeof(sizes.stock))
          return {...sizes,stock: Number(stock)+Number(sizes.stock)}
        } else {
          return sizes;
        }
      }));
      setSize('');
      setStock('');
      return toast('Added!');
    }
    setAvailable([...available, {size: size, stock: stock}]);
    setSize('');
    setStock('');
  }

  const tagChangeHandler = (e) => {
    setTag(e.target.value);
    setFiltered(allTypes.filter((type) => type.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  const addTagHandler = (tag) => {
    if(type.length >= 5) {
      return toast('limit exceed!')
    }
    if(!allTypes.includes(tag)) {
      return toast('Choose from the menu!')
    }
    if(type.includes(tag)) {
      return toast('Tag already exist!');
    }
    setType([...type, tag])
  }

  const clearFormHandler = (e) => {
    e.preventDefault();
    setImages([]);
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setAvailable([]);
    setType([]);
    setSize('');
    setStock('');
    setTag('');
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    if(!title || !description || !price || !category) {
      setLoading(false);
      return toast("fill all the required details!")
    }
    
    if(available.length < 1) {
      setLoading(false);
      return toast("Please add size and stock!");
    }

    if(type.length < 1) {
      setLoading(false);
      return toast("Please add atleast 1 tag!");
    }

    
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    
    images.forEach((image) => {
      formdata.append("images", image)
    });
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("available", JSON.stringify(available));
    formdata.append("type", JSON.stringify(type));

    try {
      const result = await api.patch(`/products/${params.id}`, formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);
      getProducts();

      // Instead of changing state products like this just call getProducts which will get products from db and set products state.
      // setProducts(products.map((item) => {
      //   if(item._id === params.id) {
      //       return {...item, title, description, price, category, available, type, images: result.data?.updatedProductData.images}
      //   }
      //   return item;
      // }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    navigate(`/item/${params.id}`);
  }

  return (
    <div className='flex'>
      <button onClick={()=> {navigate(-1)}} className='hidden lg:block px-2 py-1 w-12 cursor-pointer '>
        <i class="fa-solid fa-angle-left text-gray-700 text-3xl  text-center"></i>
      </button>
      <div className='w-full md:w-[85vw] xl:w-[60vw] min-h-screen bg-gray-100 m-auto p-5 mt-5'>
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
          <h1 className='text-[1rem] md:text-[1.2rem] text-gray-700 font-semibold'>Edit Product</h1>
          <form>
              <div className='h-20 flex gap-2 items-center'>
                <label className='flex items-center w-25' htmlFor="title">Title:</label>
                <input className='md:w-80 h-10 p-2 border-1 border-s-gray-700 outline-none'  autoComplete='off' required id='title' value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Title'/>
              </div>
              <div className='h-20 flex gap-2 items-center'>
                <label className='flex items-center w-25' htmlFor="description">Description:</label>
                <input className='md:w-80 h-10 p-2 border-1 text-wrap border-s-gray-700 outline-none' autoComplete='off' required id='description' value={description} onChange={(e) => setDescription(e.target.value)} type='text' placeholder='description'/>
              </div>
              <div className='h-20 flex gap-2 items-center'>
                <label className='flex items-center justify-center' htmlFor="img-input">Add Images: &nbsp;&nbsp;&nbsp;&nbsp; <i class="fa-solid fa-plus p-2 cursor-pointer text-[1.2rem] rounded-full bg-gray-300 flex items-center"></i></label>
                <input className='' hidden onChange={imageOnChangeHandler} id='img-input' type="file" multiple/>
              </div>
              <div className='md:flex grid grid-cols-3 gap-4 md:gap-2 mb-2'>
                {images.length? images.map((img, index) => {
                  return (
                    <div className='bg-gray-300 relative' key={index}>
                      <i onClick={() => {imageDeleteHandler(img.name, index)}} class="fa-solid fa-trash absolute right-2 top-2 text-[0.8rem] text-gray-700 cursor-pointer"></i>
                      <img className='md:h-40 md:w-30 object-contain' src={URL.createObjectURL(img)} alt="" />
                    </div>
                  )
                }): prevImages.map((img, index) => {
                  return (
                      <div className='bg-gray-300 relative' key={index}>
                        <img className='md:h-40 md:w-30 object-contain' src={img.url} alt="" />
                      </div>
                    )
                })}
              </div>
              <div className='h-20 flex gap-2 items-center'>
                <label className='flex items-center w-25' htmlFor="price">Price:</label>
                <input className='md:w-80 h-10 p-2 border-1 border-s-gray-700 outline-none no-spinner' autoComplete='off' required id='price' value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='price'/>
              </div>
              <div className='h-20 flex gap-2 items-center relative'>
                <label className='flex items-center w-25' htmlFor="category">Category:</label>
                <input onFocus={() => {setCategoryBox(true)}} onBlur={() => {setCategoryBox(false)}} autoComplete='off' required className='md:w-80 h-10 p-2 border-1 border-s-gray-700 outline-none' id='category' value={category} type='text' placeholder='Category'/>
                {/* Category dropdown box when click on select category */}
                <div className={`${categoryBox? '': 'hidden'} absolute z-10 left-26 top-16 list-none bg-white text-gray-700 text-[1rem] w-30 flex flex-col gap-1 border-1 border-gray-300`}>
                    <li className={`${category.toLowerCase() === 'men'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setCategory(e.target.innerText); setCategoryBox(false)}}>Men</li>
                    <li className={`${category.toLowerCase() === 'women'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setCategory(e.target.innerText); setCategoryBox(false)}}>Women</li>
                    <li className={`${category.toLowerCase() === 'kids'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setCategory(e.target.innerText); setCategoryBox(false)}}>Kids</li>
                </div>
              </div>
              <div className='h-20 flex gap-4 md:gap-10 items-center relative'>
                <div className='flex gap-2 items-center'>
                  <label className='flex items-center w-10 md:w-25' htmlFor="size">Size:</label>
                  <input onFocus={() => {setSizeBox(true)}} onBlur={() => {setSizeBox(false)}} autoComplete='off' className='w-15 h-10 p-2 border-1 border-s-gray-700 outline-none' id='size' value={size} type='text' placeholder='Size'/>
                  {/* Category dropdown box when click on select category */}
                  <div className={`${sizeBox? '': 'hidden'} absolute z-10 left-11 top-16 list-none bg-white text-gray-700 text-[1rem] w-30 flex flex-col gap-1 border-1 border-gray-300`}>
                      <li className={`${size === 'S'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setSize(e.target.innerText); setSizeBox(false)}}>S</li>
                      <li className={`${size === 'M'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setSize(e.target.innerText); setSizeBox(false)}}>M</li>
                      <li className={`${size === 'L'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setSize(e.target.innerText); setSizeBox(false)}}>L</li>
                      <li className={`${size === 'XL'? 'bg-gray-300': ''} px-2 py-1 cursor-pointer`} onMouseDown={(e) => {setSize(e.target.innerText); setSizeBox(false)}}>XL</li>
                  </div>
                </div>
                <div className='flex'>
                  <label className='flex items-center w-15 md:w-25' htmlFor="stock">Stock:</label>
                  <input className='w-20 md:w-30 h-10 p-2 border-1 border-s-gray-700 outline-none no-spinner' autoComplete='off' id='stock' type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder='Stock'/>
                </div>
                <div className='flex gap-2'>
                  <button onClick={availableAddHandler} className='px-4 py-1 h-10 bg-gray-300 cursor-pointer'>Add</button>
                  <button onClick={(e) => {e.preventDefault(); setAvailable([])}} className='hidden md:block px-4 py-1 h-10 bg-gray-300 cursor-pointer'>Clear</button>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 md:gap-10'>
                {available.map((sizeStock) => {
                  return (
                    <div className='w-fit h-10 border-1 border-gray-400 flex items-center '>
                      <div className='w-10 p-2 border-r-1 border-gray-400'>{sizeStock.size}</div>
                      <div className='w-full p-2'>{sizeStock.stock}</div>
                    </div>
                  )
                })}
                <button onClick={(e) => {e.preventDefault(); setAvailable([])}} className='md:hidden px-2 py-1 bg-gray-300 cursor-pointer'>Clear</button>
              </div>
              <div className='h-20 flex gap-10 items-center'>
                <div className='flex gap-2 relative'>
                  <label className='flex items-center w-25' htmlFor="tag">Tag:</label>
                  <input onFocus={() => setTypeBox(true)} onBlur={() => setTypeBox(false)} onChange={tagChangeHandler} autoComplete='off' className='input md:w-80 h-10 p-2 border-1 text-wrap border-s-gray-700 outline-none' id='tag' value={tag} type='text' placeholder='Add tags'/>
                  <div className={`${typeBox? '': 'hidden'} input.active:hidden scrollable-container absolute z-10 left-26 top-12 list-none bg-white text-gray-700 text-[1rem] w-40 max-h-40 overflow-auto flex flex-col gap-1 border-1 border-gray-300`}>
                    {filtered.map((tag) => {
                      return <li onMouseDown={(e) => addTagHandler(e.target.innerText)} className={`px-2 py-1 cursor-pointer`}>{tag}</li>
                    })}    
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap gap-2 md:gap-5'>
                {type.map((tag, index) => {
                  return (
                    <div key={index} className='flex gap-2 items-center h-10 w-fit border-1 border-gray-400 p-2'>
                      {tag} <i onClick={() => tagDeleteHandler(index)} class="fa-solid fa-xmark cursor-pointer"></i>
                    </div>
                  )
                })}
              </div>
              <div className='flex gap-5 mt-8'>
                {!loading?<button onClick={onSubmitHandler} className='h-10 w-fit px-4 py-1 bg-black text-white cursor-pointer'>Edit Product</button>
                :<button disabled className='h-10 w-fit px-4 py-1 bg-black text-white cursor-pointer'>Loading</button>}
                <button onClick={clearFormHandler} className='h-10 w-fit px-4 py-1 bg-gray-300 cursor-pointer'>Clear form</button>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Edit