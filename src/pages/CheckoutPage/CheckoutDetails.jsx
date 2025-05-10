import React from 'react';
import Select from '../../components/Select/Select';

const CheckoutDetails = () => (
  <div className="left-panel">
    <div className="section">
      <div className="section-header">
        <span className="icon">👤</span>
        <p>Aman | 7292048622</p>
        <span className="status success">✔</span>
      </div>
    </div>

    <div className="section">
      <div className="section-header">
        <span className="icon">📍</span>
        <h3>Pickup address</h3>
        <span className="status success">✔</span>
      </div>
      <p><strong>Home</strong></p>
      <p>F 54b sec 48 vipul world near flow sports life, Fazilpur Jharsa, Sector 72, Gurugram, Haryana, India</p>
    </div>

    <div className="section">
      <div className="section-header">
        <span className="icon">📅</span>
        <h3>Pickup Time</h3>
      </div>
      <div className="pickup-row">
        <div className="pickup-select">
          <Select
            options={[{id:1,name:"Today"},{id:1,name: "Tomorrow"}]}
            placeholder="Select Day"
          />
        </div>
        <div className="pickup-select">
          <Select
            options={[
              {id:1,name:"9:00 AM – 10:00 AM"},
              {id:2,name:"10:00 AM – 11:00 AM"},
              {id:3,name:"11:00 AM – 12:00 AM"}
            ]}
            placeholder="Select Time"
          />
        </div>
      </div>
    </div>

    <div className="bill-details">
      <div className="bill-row">
        <span>Item Total</span>
        <span className="price">₹120</span>
      </div>
      <div className="bill-row">
        <span>GST & Other Charges</span>
        <span className="price">₹27.25</span>
      </div>
    </div>

    <div className="total-pay">
      <h3>TO PAY</h3>
      <h3>₹195</h3>
    </div>

    <div className="section">
      <button className="pay-btn">Pay Now</button>
    </div>
  </div>
);

export default CheckoutDetails;