import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../app/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1 // Default quantity when adding to cart
        }));
         // Show toast notification
         toast.success(`${item.name} added to cart!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

  return (
    <div className="menu-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="item-image" 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
        }} 
      />
      <div className="item-details">
        <div className="item-name">{item.name}</div>
        <div className="item-desc">{item.description}</div>
        <div className="item-price">₹ {item.price}</div>
        <div className="item-footer">
          {item.available ? (
            <button className="order-btn" onClick={handleAddToCart}>
              Add to Order
            </button>
          ) : (
            <span className="unavailable">Currently Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;