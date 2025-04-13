import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="menu-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="item-image" 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
        }} 
      />
      <div className="item-details">
        <div className="item-name">{item.name}</div>
        <div className="item-desc">{item.description}</div>
        <div className="item-price">₹ {item.price}</div>
        <div className="item-footer">
          {item.available ? (
            <button className="order-btn" onClick={() => addToCart(item.id)}>
              Add to Order
            </button>
          ) : (
            <span className="unavailable">Currently Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;