import React from 'react';

const CartIcon = ({ itemCount, toggleCart }) => {
  return (
    <div className="cart-icon" onClick={toggleCart}>
      🛒
      <div className="cart-count">{itemCount}</div>
    </div>
  );
};

export default CartIcon;