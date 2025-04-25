import React from 'react';
import styles from './Header.module.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaStar, FaClock } from 'react-icons/fa';
import useRestaurant from '../../app/hooks/useRestaurant';

const RestaurantHeader = ({restaurant, loading, error}) => {
  if (loading) return <div className={styles.loading}>Loading restaurant details...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!restaurant) return <div className={styles.error}>Restaurant not found</div>;

  // Format opening hours
  const openingHours = `${restaurant.opening_time} - ${restaurant.closing_time}`;
  const image_url = `http://localhost/images/food/restaurant/${restaurant.logo_url}` || '/default-logo.jpg'
  return (
    <header className={styles.orangeThemeHeader}>
      <div className={styles.headerTop}>
        <div className={styles.branding}>
          <img 
            src={image_url} 
            alt={`${restaurant.name} Logo`} 
            className={styles.logo} 
          />
          <div className={styles.brandText}>
            <h1 className={styles.restaurantName}>{restaurant.name}</h1>
            <p className={styles.cuisineType}>{restaurant.cuisine_type}</p>
            <div className={styles.ratingContainer}>
              <span className={styles.rating}>
                <FaStar className={styles.starIcon} />
                {restaurant.avg_rating}
              </span>
              <span className={styles.topDishes}>{restaurant.top_dishes}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.quickInfo}>
          <div className={styles.infoItem}>
            <FaClock className={styles.infoIcon} />
            <div>
              <p className={styles.infoLabel}>Opening Hours</p>
              <p className={styles.infoValue}>{openingHours}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <div>
              <p className={styles.infoLabel}>Location</p>
              <p className={styles.infoValue}>{restaurant.address?.split(',')[1]?.trim() || restaurant.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.headerBottom}>
        <div className={styles.addressContainer}>
          <FaMapMarkerAlt className={styles.addressIcon} />
          <p className={styles.fullAddress}>{restaurant.address}</p>
        </div>
        <div className={styles.contactContainer}>
          <a href={`tel:${restaurant.contact_phone}`} className={styles.phoneLink}>
            <FaPhoneAlt className={styles.phoneIcon} />
            {restaurant.contact_phone}
          </a>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;