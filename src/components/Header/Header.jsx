import React from 'react';
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaBars, FaUser } from 'react-icons/fa';
import './Header.css';
import logoImage from '../../assets/logo.png';
import LocationSelector from './LocationSelector';
const Header = ({ cartCount, userLocation, onChangeLocation }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src={logoImage} alt="Feast Logo" className="logo-img" />

        </div>
        <div className="location">
          <LocationSelector/>
        </div>
      </div>

      <div className="header-right">
        <button className="header-button">
          <FaBars className="button-icon" /> Bulk Order
        </button>
        <button className="header-button">
          <FaSearch className="button-icon" /> Search
        </button>
        <button className="header-button">
          <FaUser className="button-icon" /> Sign In
        </button>
        {/* <button className="header-button cart-button">
          <FaShoppingCart className="cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button> */}
      </div>
    </header>
  );
};

export default Header;
