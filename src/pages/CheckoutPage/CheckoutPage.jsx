import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./checkout.css"
import Header from '../../components/Header/Header';
const CheckoutPage = ({ cart, total }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    const newOrderNumber = Math.floor(Math.random() * 1000000);
    setOrderNumber(newOrderNumber);
    setOrderSubmitted(true);
    
    // Clear cart after 5 seconds and redirect
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (orderSubmitted) {
    return (
      <div className="checkout-container">
        <div className="order-confirmation">
          <h2>Order Confirmed!</h2>
          <p>Thank you for your order, {formData.name}!</p>
          <p>Your order number is: <strong>{orderNumber}</strong></p>
          <p>We've sent a confirmation to {formData.email}</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart?.map(item => (
                <li key={`${item.id}-${Math.random()}`}>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="order-total">Total: ${total.toFixed(2)}</p>
          </div>
          <p>You'll be redirected to the home page shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
        <Header />
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Your Order</h3>
          <ul>
            {/* {cart.map(item => (
              <li key={`${item.id}-${Math.random()}`}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))} */}
          </ul>
          {/* <p className="order-total">Total: ${total.toFixed(2)}</p> */}
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Customer Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialInstructions">Special Instructions</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any special delivery instructions..."
            />
          </div>
          <button type="submit" className="submit-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;