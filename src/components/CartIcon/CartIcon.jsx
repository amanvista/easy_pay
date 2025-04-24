import React from 'react';
import { selectCartCount } from '../../app/slices/cartSlice';
import { useSelector } from 'react-redux';
import { MdShoppingCart } from "react-icons/md";

const CartIcon = ({  toggleCart }) => {
  const itemCount = useSelector(selectCartCount);
  return (
    <div className="cart-icon" onClick={toggleCart}>
      <MdShoppingCart size={20} color="white" style={{ marginRight: 0 }} />
      {itemCount > 0 && (
        <div className="cart-count">{itemCount}</div>
      )}
    </div>
  );
};

export default CartIcon;