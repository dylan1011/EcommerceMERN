import React, {useState} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import './navbar.css'
 
const Navbar = () => {
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)
 
    return (
        <div className='header'>
            <div className='container'>
                <h1 className='logo' >Shop</h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    
                        <a href='/'>Username</a><br/>
                    
                    
                        <a href='/'>Products</a>
                    
                   
                        <a href='/'>Cart</a>
                    
                        <a href='/'>Checkout</a>
                   
                </ul>
                {/* <div className='btn-group'>
                    <button className='btn'>Connect Wallet</button>
                </div> */}
                {/* <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: '#333'}}/>) : (<FaBars size={20} style={{color: '#333'}} />)}
                     
                </div> */}
            </div>
        </div>
    )
}
 
export default Navbar