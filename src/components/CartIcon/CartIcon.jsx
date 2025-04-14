import React from 'react';
import { selectCartCount } from '../../app/slices/cartSlice';
import { useSelector } from 'react-redux';

const CartIcon = ({  toggleCart }) => {
  const itemCount = useSelector(selectCartCount);
  return (
    <div className="cart-icon" onClick={toggleCart}>
      🛒
      {itemCount > 0 && (
        <div className="cart-count">{itemCount}</div>
      )}
    </div>
  );
};

export default CartIcon;