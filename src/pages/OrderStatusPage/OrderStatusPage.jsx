import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderStatus.css';

const OrderStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, cart = [], customerInfo = {} } = location.state || {};
  const [orderStatus, setOrderStatus] = useState({
    paymentVerified: false,
    preparing: false,
    prepared: false,
    packed: false,
    readyForPickup: false
  });
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Calculate order total
  const orderTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    const statusUpdates = [
      { delay: 2, status: 'paymentVerified' },
      { delay: 5, status: 'preparing' },
      { delay: 10, status: 'prepared' },
      { delay: 15, status: 'packed' },
      { delay: 20, status: 'readyForPickup' }
    ];

    statusUpdates.forEach(({ delay, status }) => {
      setTimeout(() => {
        setOrderStatus(prev => ({ ...prev, [status]: true }));
      }, delay * 1000);
    });

    return () => clearInterval(timer);
  }, [orderId, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="order-status-container">
      <div className="order-header">
        <h2>Order #{orderId}</h2>
        <p className="time-elapsed">Time elapsed: {formatTime(timeElapsed)}</p>
      </div>

      <div className="order-content">
        <div className="order-details">
          <div className="customer-info">
            <h3>Customer Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{customerInfo.name || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{customerInfo.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="order-items">
            <h3>Your Order</h3>
            <ul className="items-list">
              {cart.map(item => (
                <li key={item.id} className="order-item">
                  <div className="item-detail">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">× {item.quantity}</span>
                  </div>
                  <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Total:</span>
              <span>₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="status-section">
          <h3>Order Status</h3>
          <div className="status-timeline">
            <div className={`status-item ${orderStatus.paymentVerified ? 'completed' : ''}`}>
              <div className="status-icon">
                {orderStatus.paymentVerified ? '✓' : '1'}
              </div>
              <div className="status-details">
                <h4>Payment Verified</h4>
                <p>Your payment has been confirmed</p>
              </div>
            </div>

            <div className={`status-item ${orderStatus.preparing ? 'completed' : ''}`}>
              <div className="status-icon">
                {orderStatus.preparing ? '✓' : '2'}
              </div>
              <div className="status-details">
                <h4>Preparing Your Order</h4>
                <p>Chef has started cooking</p>
              </div>
            </div>

            <div className={`status-item ${orderStatus.prepared ? 'completed' : ''}`}>
              <div className="status-icon">
                {orderStatus.prepared ? '✓' : '3'}
              </div>
              <div className="status-details">
                <h4>Order Prepared</h4>
                <p>Your food is ready for packing</p>
              </div>
            </div>

            <div className={`status-item ${orderStatus.packed ? 'completed' : ''}`}>
              <div className="status-icon">
                {orderStatus.packed ? '✓' : '4'}
              </div>
              <div className="status-details">
                <h4>Order Packed</h4>
                <p>Your items have been packed</p>
              </div>
            </div>

            <div className={`status-item ${orderStatus.readyForPickup ? 'completed' : ''}`}>
              <div className="status-icon">
                {orderStatus.readyForPickup ? '✓' : '5'}
              </div>
              <div className="status-details">
                <h4>Ready for Pickup</h4>
                <p>Your order is waiting at the counter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          onClick={() => navigate('/')}
          className="back-to-home"
        >
          Back to Home
        </button>
        <button 
          onClick={() => window.print()}
          className="print-receipt"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderStatusPage;