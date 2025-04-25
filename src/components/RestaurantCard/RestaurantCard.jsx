import React from 'react';
import './RestaurantCard.css';
import Star from '../icons/Star/Star';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant, onOrder }) => {
  const {
    name,
    main_image_url,
    cuisine_type,
    address,
    avg_rating,
    top_dishes,
    opening_time,
    discount,
  } = restaurant;
  const imageUrl = `http://localhost/images/food/${main_image_url}`
  const navigate = useNavigate();
  const onClickPreorder = ()=>{
    navigate(`/menu?id=${restaurant.id}`)
  }
  return (
    <div className="restaurant-card">
      <div className="card-image-container">
        {/* Discount Badge (optional if your API supports this field in future) */}
        {discount && (
          <div className="discount-badge">
            {discount}% OFF
          </div>
        )}

        <img 
          src={imageUrl} 
          alt={name}
          className="card-image"
        />
      </div>

      <div className="card-content">
        <div className="preorder-tag">Pre-Order Available</div>

        <div className="card-header">
          <h3 className="card-title">{name}</h3>
          <span class="rating-badge">
  {avg_rating ? avg_rating.toFixed(1) : '4.1'}
      <Star/>
    </span>
        </div>

        <div className="card-subtitle">
          {cuisine_type} • {address}
        </div>

        <div className="popular-dishes">
          <strong>Top Dishes:</strong> {top_dishes?.split(',').slice(0, 2).join(', ') || 'N/A'}
        </div>

        <button className="order-button" onClick={onClickPreorder}>
          Pre-Order Now & Skip the Wait!
        </button>

        <div className="opens-at">
          <span>Opens at: <strong>{opening_time?.split(':').slice(0, 2).join(':') || 'N/A'}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
