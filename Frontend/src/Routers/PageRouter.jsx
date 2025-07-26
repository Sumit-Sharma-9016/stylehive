import {Routes, Route} from 'react-router-dom'
import Collection from '../pages/Collection'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import ItemDetails from '../pages/ItemDetails'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
import Login from '../pages/Login'
import Add from '../pages/Add'
import AllOrders from '../pages/AllOrders'
import Edit from '../pages/Edit'
import PlaceOrder from '../pages/PlaceOrder'
import Profile from '../pages/Profile'

const PageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection/:category' element={<Collection/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/item/:id' element = {<ItemDetails/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-item' element={<Add/>}/>
        <Route path='/all-orders' element={<AllOrders/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
        <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}

export default PageRouter
