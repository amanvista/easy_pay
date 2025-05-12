import React from 'react';
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaBars, FaUser } from 'react-icons/fa';
import './Header.css';
import logoImage from '../../assets/logo.png';
import LocationSelector from './LocationSelector';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../app/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
const Header = ({  userLocation, onChangeLocation }) => {
  const navigate = useNavigate()
  const handleCartClick = () => {
    navigate('/checkout');
  };
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={()=>navigate("/search")}>
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
        <button className="header-button" onClick={handleCartClick}>
          <FaShoppingCart className="button-icon" />
          {cart.length > 0 && <span >{cart.length}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
