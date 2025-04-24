import React from 'react';
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaBars, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartCount, userLocation, onChangeLocation }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">Feast</span>
        </div>
        <div className="location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{userLocation}</span>
          <button className="location-change" onClick={onChangeLocation}>Change</button>
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
