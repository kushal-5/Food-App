import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("Home")
    const {getTotalCartAmount}=useContext(StoreContext)
    return (
        <div className='navbar' >
            <Link to="/" className="logo-link">
                <img src={assets.logo} alt="" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li>
                <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</li>
                <li onClick={()=>setMenu("Mobile-App")} className={menu==="Mobile-App"?"active":""}>Mobile-App</li>
                <li onClick={()=>setMenu("Contact")} className={menu==="Contact"?"active":""}>Contact</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <Link to="/cart" className="navbar-search-icon">
                    <img src={assets.basket_icon} alt=""/>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </Link>
                <button onClick={()=>setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
}

export default Navbar
