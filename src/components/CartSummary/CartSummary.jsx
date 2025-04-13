import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ cart, removeFromCart, total, checkout, isVisible }) => {
  if (!isVisible) return null;
  const navigate = useNavigate();
  return (
    <div className="cart-summary show-cart">
      <h3>Your Order</h3>
      <div className="cart-items">
        {cart?.map(item => (
          <div key={`${item.id}-${Math.random()}`}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button 
              onClick={() => removeFromCart(item.id)} 
              style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer", color: "var(--unavailable-color)" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        Total: $<span>{total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={()=>navigate("/checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;