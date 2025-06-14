import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import paymentQR from '../../assets/payment-qr.png';
import './payment.css';
import useCart from '../../app/hooks/useCart';

const PaymentPage = () => {
  const {total, items} = useCart();
  const cart = items;
  const navigate = useNavigate();
  const location = useLocation();
  // const { cart, total } = location.state || { cart: [], total: 0 };
  const [screenshot, setScreenshot] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshot(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPayment = () => {
    setIsUploaded(true);
    setTimeout(() => {
      navigate('/confirmation', { 
        state: { orderId: `ORD-${Math.floor(Math.random() * 1000000)}` } 
      });
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="payment-left">
        <h2>Payment Instructions</h2>
        <div className="qr-instructions">
          <p>1. Open your payment app</p>
          <p>2. Scan the QR code below</p>
          <p>3. Pay the exact amount: <strong>₹{total.toFixed(2)}</strong></p>
        </div>
        
        <div className="qr-code-wrapper">
          <img src={paymentQR} alt="Payment QR Code" className="qr-code-image" />
          <p className="upi-id">UPI ID: yourrestaurant@upi</p>
        </div>
        
        <div className="order-summary">
          <h3>Your Order</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="order-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="payment-right">
        <h2>Upload Payment Proof</h2>
        <div className="upload-section">
          {!screenshot ? (
            <div className="upload-instructions">
              <div className="upload-icon">📤</div>
              <p>After making payment, upload your screenshot here</p>
              <label htmlFor="payment-screenshot" className="upload-btn">
                Select Screenshot
                <input
                  type="file"
                  id="payment-screenshot"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                />
              </label>
            </div>
          ) : (
            <div className="screenshot-section">
              <div className="screenshot-preview">
                <img src={screenshot} alt="Payment proof" />
                {!isUploaded && (
                  <button 
                    onClick={handleSubmitPayment}
                    className="submit-btn"
                  >
                    Confirm Payment
                  </button>
                )}
              </div>
              {isUploaded && (
                <div className="verification-status">
                  <div className="spinner"></div>
                  <p>Verifying your payment...</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="help-section">
          <h3>Need Help?</h3>
          <ul>
            <li>Make sure screenshot shows payment success</li>
            <li>Include amount and transaction ID if possible</li>
            <li>Contact us at +91 9876543210 for issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;