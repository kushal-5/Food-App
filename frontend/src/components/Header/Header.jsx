import React from 'react'
import './Header.css'
import { assets } from '../../assets/frontend_assets/assets'

const Header = () => {
    const scrollToMenu = () => {
        const foodDisplaySection = document.getElementById('food-display');
        if (foodDisplaySection) {
            foodDisplaySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='header' style={{ backgroundImage: `url(${assets.header_img})` }}>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={scrollToMenu}>View Menu</button>
            </div>
        </div>
    )
}

export default Header
