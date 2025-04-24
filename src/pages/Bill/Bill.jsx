import React from 'react';
import './Bill.css';

const Bill = () => {
  const restaurant = {
    name: 'SPICE VILLA RESTAURANT',
    address: '123, Food Street, Mumbai',
    phone: '+91 9876543210',
    gstin: '22ABCDE1234F1Z5'
  };

  const customer = {
    name: 'Ravi Sharma',
    orderNumber: 'ORD20250421',
    orderDate: new Date().toLocaleDateString(),
    orderTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    otp: Math.floor(100000 + Math.random() * 900000), // Random 6-digit OTP
    tableNo: 'T05'
  };

  const items = [
    { name: 'Paneer Butter Masala', quantity: 2, price: 180 },
    { name: 'Tandoori Roti', quantity: 4, price: 20 },
    { name: 'Masala Dosa', quantity: 1, price: 90 },
    { name: 'Gulab Jamun', quantity: 2, price: 40 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gstRate = 0.05;
  const gstAmount = subtotal * gstRate;
  const total = subtotal + gstAmount;

  return (
    <div className="restaurant-bill">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        {/* <p className="restaurant-info">{restaurant.address}</p> */}
        {/* <p className="restaurant-info">Phone: {restaurant.phone}</p> */}
        {/* <p className="restaurant-info">GSTIN: {restaurant.gstin}</p> */}
      </div>
      <div className="bill-divider">--------------------------------</div>
      <div className="bill-meta-section">
        <p><strong>Order No:</strong> {customer.orderNumber}</p>
        <p><strong>Date:</strong> {customer.orderDate} {customer.orderTime}</p>
        <p><strong>Customer:</strong> {customer.name}</p>
        {/* <p><strong>Table No:</strong> {customer.tableNo}</p> */}
        <p><strong>OTP:</strong> {customer.otp}</p>
      </div>
      <div className="bill-divider">--------------------------------</div>
      <table className="bill-table">
        <thead>
          <tr>
            <th className="item-col">Item</th>
            <th className="qty-col">Qty</th>
            <th className="rate-col">Rate</th>
            <th className="amount-col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="item-col">{item.name}</td>
              <td className="qty-col">{item.quantity}</td>
              <td className="rate-col">{item.price.toFixed(2)}</td>
              <td className="amount-col">{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-divider">--------------------------------</div>

      <div className="bill-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>GST (5%)</span>
          <span>₹{gstAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <strong>Total Payable</strong>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
      </div>

      <div className="bill-divider">--------------------------------</div>

      <div className="bill-footer">
        <p className="thank-you">Thank you for ordering with us!</p>
        <p className="visit-again">Please visit again</p>
      </div>
    </div>
  );
};

export default Bill;