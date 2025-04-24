import React from 'react';
import './MenuItemCard.css';

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item-card">
      <div className="menu-image-container">
        {item.isBestseller && <div className="bestseller-tag">Bestseller</div>}
        <img src={item.image} alt={item.name} className="menu-image" />
      </div>

      <div className="menu-content">
        <h4 className="menu-title">{item.name}</h4>
        <p className="menu-description">{item.description}</p>

        <div className="menu-footer">
          <span className="menu-price">₹{item.price}</span>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(item)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
