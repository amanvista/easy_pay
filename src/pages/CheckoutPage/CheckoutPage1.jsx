import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./checkout.css"
import Header from '../../components/Header/RestaurantHeader';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../app/slices/cartSlice';

const CheckoutPage2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: '',
    deliveryDate: 'today',
    timeSlot: 'ASAP'
  });
  
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Available time slots
  const timeSlots = [
    { value: 'ASAP', label: 'As soon as possible' },
    { value: '11:00-13:00', label: '11:00 AM - 1:00 PM' },
    { value: '13:00-15:00', label: '1:00 PM - 3:00 PM' },
    { value: '18:00-20:00', label: '6:00 PM - 8:00 PM' },
    { value: '20:00-22:00', label: '8:00 PM - 10:00 PM' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate random order number
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
          <p>Delivery Date: <strong>{formData.deliveryDate === 'today' ? 'Today' : 'Tomorrow'}</strong></p>
          <p>Delivery Time: <strong>{timeSlots.find(slot => slot.value === formData.timeSlot)?.label}</strong></p>
          <p>We've sent a confirmation to {formData.email}</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart?.map(item => (
                <li key={`${item.id}-${Math.random()}`}>
                  {item.name} - ₹ {item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="order-total">Total: ₹ {total}</p>
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
            {cart.map(item => (
              <li key={`${item.id}-${Math.random()}`}>
                {item.name} - ₹ {item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          
          <div className="delivery-info">
            <h4>Delivery Information</h4>
            <div className="delivery-option">
              <span>Date:</span>
              <span>{formData.deliveryDate === 'today' ? 'Today' : 'Tomorrow'}</span>
            </div>
            <div className="delivery-option">
              <span>Time:</span>
              <span>{timeSlots.find(slot => slot.value === formData.timeSlot)?.label}</span>
            </div>
          </div>
          
          <p className="order-total">Total: ₹ {total}</p>
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deliveryDate">Delivery Date</label>
              <select
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                required
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                required
              >
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
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

export default CheckoutPage2;