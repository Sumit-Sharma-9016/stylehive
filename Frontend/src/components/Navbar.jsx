import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppProvider';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [miniMenu, setMiniMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let isCollectionPage = location.pathname === '/collection' 
  const {cartItems} = useContext(AppContext);
  const {user, fetchUser} = useContext(UserContext);
  const {searchBox, setSearchBox, searchInput, setSearchInput} = useContext(AppContext);

  let toggleVisible = () => {
    setVisible((current) => !current)
  }
  let toggleMiniMenu = () => {
    setMiniMenu((current) => !current)
  }
  return (
    <div className='w-[100%] flex justify-between items-center md:[px-4 py-2] px-5 h-[8vh] select-none bg-white sticky top-0 z-10'>
        <Link to='/'><h2 className='text-gray-700 font-semibold sm:text-4xl text-2xl logo-title'>STYLEHIVE</h2></Link>
        <div onClick={() => setMiniMenu(false)} className='hidden md:w-full md:flex justify-center gap-6 text-[0.85rem] font-semibold text-gray-700 border-none'>
            <NavLink className='flex flex-col gap-0.5 items-center' to='/'> <p>HOME</p><hr className='w-3/4 hidden'/></NavLink>
            <NavLink className='flex flex-col gap-0.5 items-center' to='/collection'> <p>COLLECTION</p><hr className='w-3/4 hidden'/></NavLink>
            {user?.role === "admin" || <NavLink className='flex flex-col gap-0.5 items-center' to='/contact'> <p>CONTACT</p><hr className='w-3/4 hidden'/></NavLink>}
            {user?.role === "admin" || <NavLink className='flex flex-col gap-0.5 items-center' to='/about'> <p>ABOUT</p><hr className='w-3/4 hidden'/></NavLink>}
            {user?.role === "admin" && <NavLink className='flex flex-col gap-0.5 items-center' to='/all-orders'> <p>ORDERS</p><hr className='w-3/4 hidden'/></NavLink>}
            {user?.role === "admin" && <NavLink className='flex flex-col gap-0.5 items-center' to='/add-item'> <p>ADD</p><hr className='w-3/4 hidden'/></NavLink>}
        </div>
        <div className='flex md:gap-3 gap-1 cursor-pointer font-semibold text-gray-700 text-[1.2rem]'>
          <div className='flex w-full items-center justify-center'>
            <label htmlFor="search-input"><i onClick={() => {navigate('/collection'); setSearchBox(true)}} className="fa-solid fa-magnifying-glass p-2"></i></label>
            {searchBox && isCollectionPage? <><input id='search-input' className='h-10 w-84 md:w-70 absolute top-15 right-5 lg:top-12 lg:right-4  outline-none border border-gray-400 bg-white text-gray-700 text-[0.9rem] font-medium px-4 py-2' value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} type="text" />
            <i onClick={() => {setSearchInput('');setSearchBox(false);}} class="fa-solid fa-xmark absolute top-18 right-0 lg:top-15 lg:right-0 h-10 w-12"></i></>:''}
          </div>
          <div className='relative'>
            <i onClick={ user? toggleMiniMenu: () => {navigate('/login')}} class="fa-solid fa-user p-2"></i>
            <div className={`${miniMenu? 'block':'hidden'} dropdown-menu absolute bg-white border-1 border-gray-300 right-0 p-2 text-[0.8rem] w-25`}>
              <div className='flex flex-col gap-3'>
                {user?.role === "admin" || <p className='w-full' onClick={() => {
                  navigate('/profile');
                  toggleMiniMenu();
                  }}>PROFILE</p>}
                {user?.role === "admin" || <p onClick={() => {
                  navigate('/orders');
                  toggleMiniMenu();
                  }}>ORDERS</p>}
                <p onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                  window.location.reload();
                  toggleMiniMenu();
                }}>LOGOUT</p>
              </div>
            </div>
          </div>
          {user?.role === "admin" || <i onClick={() => {user? navigate('/cart'): navigate('/login')}} className="fa-solid fa-bag-shopping relative p-2 "><div className='absolute right-0 bottom-0 h-4 w-4 bg-black text-white text-[0.5rem] flex items-center justify-center rounded-full'>{cartItems.length}</div></i>}
          <div onClick={toggleVisible} className="md:hidden block"><i class="fa-solid fa-bars p-2"></i></div>
        </div>
        
        {/* div for menubar for small screen */}
        {visible &&
          <div className='absolute right-0 top-0 bg-white w-[100%] h-[100vh] py-4 '>
            <div onClick={toggleVisible} className='relative text-[0.9rem]'>
              <i class="fa-solid fa-arrow-left absolute right-3 top-2 text-gray-700 cursor-pointer"> Back</i>
            </div>
            <div className='mt-10 flex flex-col text-[1.1rem] justify-center font-semibold text-gray-700 bg-white'>
              <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/'>HOME</NavLink>
              <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/collection'>COLLECTION</NavLink>
              {!user && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/contact'>CONTACT</NavLink>}
              {!user && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/about'>ABOUT</NavLink>}
              {user?.role === "user" && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/contact'>CONTACT</NavLink>}
              {user?.role === "user" && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/about'>ABOUT</NavLink>}
              {user?.role === "admin" && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/all-orders'>ORDERS</NavLink>}
              {user?.role === "admin" && <NavLink className='border-b-1 h-10 px-4 py-1.5' onClick={toggleVisible} to='/add-item'>ADD</NavLink>}
            </div>
            <p className='text-center mt-5 text-gray-700'>all rights reserved &copy;</p>
          </div>
        } 
    </div>
  )
}

export default Navbar