import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/admin_assets";

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={assets.logo} alt="Logo" className="logo" />
            <div className="navbar-profile">
                <img src={assets.profile_placeholder} alt="Profile" className="profile-image" />
                <p>Admin</p>
            </div>
        </div>
    );
};

export default Navbar;
