import React from 'react';

const OrderSummary = () => (
  <div className="right-panel">
    <div className="restaurant-info">
      <img src="https://via.placeholder.com/50" alt="Dish" />
      <div>
        <h4>FreshMenu</h4>
        <p>Sector 69</p>
      </div>
    </div>

    <div className="order-item">
      <p>High Protein English Breakfast</p>
      <p className="old-price">₹120</p>
    </div>
    
    <textarea placeholder="Any suggestions? We will pass it on..."></textarea>
  </div>
);

export default OrderSummary;