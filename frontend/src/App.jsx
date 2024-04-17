import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from '../src/components/login'
// import './App.css'
import SignUp from './components/signup1';
import Home from '../src/components/homepage';
import Product from '../src/components/products';
import UpdateProduct from './components/updateproduct';
import Checkout from './components/checkout';
import Cart from './components/cart';
import Resetpassword from './components/resetPassword';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);

  return (
    <>
    <div className='body'>
    <BrowserRouter>
      <Routes>
      <Route path='signup' element = {<SignUp/>}/>
        <Route path='login' element = {<Login setToken ={setToken}/>}/>
        <Route path="/profile/user" element={token ? <Home /> : <Navigate to="/users/login"/>}/>
        <Route path="/product/all" element={ <Product /> }/>
        <Route path = "/product/admin/add" element = {<UpdateProduct/>}/>
        <Route path="/checkout/user/checkout" element={ <Checkout /> }/>
        <Route path="/addcart/usercart" element={ <Cart /> }/>
        <Route path="/resetpassword" element={ <Resetpassword /> }/>

      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
