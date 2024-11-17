import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'; 

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, food_list, token, setToken } = useContext(StoreContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  

  const subtotal = food_list.reduce((acc, item) => {
    if (cartItems[item._id] > 0) {
      acc += item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  return (
    <div className="navbar">
      <Link to="/"> <img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app" onClick={() => setMenu("app")} className={menu === "app" ? "active" : ""}>App</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="Cart Icon" /></Link>
          {subtotal > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div
            className="navbar-profile"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className={`navprofile-dropdown ${dropdownVisible ? "visible" : ""}`}>
              <li>
                <img src={assets.bag_icon} alt="Order Icon" />
                <p>My Orders</p>
              </li>
              <li onClick={() => setToken(null)}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
