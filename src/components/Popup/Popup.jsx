import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {title && <h3 className="popup-title">{title}</h3>}
        <div className="popup-content">{children}</div>
        <button className="popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
