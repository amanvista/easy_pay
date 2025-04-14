import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, selectCartItems, selectCartTotal } from '../../app/slices/cartSlice';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash icon from react-icons
import "./cartsummary.css"
const CartSummary = ({ isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (!isVisible) return null;

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-summary show-cart">
      <h3>Your Order</h3>
      <div className="cart-items">
        {cart?.map(item => (
          <div key={`${item.id}-${Math.random()}`} className="cart-item">
            <span className="item-info">
              {item.name} - ₹ {item.price} x {item.quantity}
            </span>
            <button 
              onClick={() => handleRemoveFromCart(item.id)} 
              className="delete-btn"
              aria-label="Remove item"
            >
              <FaTrashAlt className="trash-icon" />
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        Total: ₹ <span>{total}</span>
      </div>
      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;