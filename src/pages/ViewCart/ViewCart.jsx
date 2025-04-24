// ViewCart.jsx
import React, { useState } from 'react';
import './ViewCart.css';

const sampleCartItems = [
  { name: 'Margherita Pizza', price: 299, quantity: 1 },
  { name: 'Veggie Burger', price: 199, quantity: 2 },
];

const ViewCart = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const totalAmount = sampleCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    alert(`Proceeding to payment for ${customerName} (₹${totalAmount})`);
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      <div className="cart-items">
        {sampleCartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <span>{item.name}</span>
            <span>
              ₹{item.price} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{totalAmount}</h3>

        <div className="customer-details">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button className="proceed-button" onClick={handlePayment} disabled={!customerName || !phoneNumber}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ViewCart;
