import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    if (menuItem === "Home") {
      navigate("/");
    } else if (menuItem === "Menu") {
      const foodDisplaySection = document.getElementById('food-display');
      if (foodDisplaySection) {
        foodDisplaySection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (menuItem === "Contact") {
      const footerSection = document.getElementById('footer');
      if (footerSection) {
        footerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => handleMenuClick("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => handleMenuClick("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </li>
        <li
          onClick={() => handleMenuClick("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
