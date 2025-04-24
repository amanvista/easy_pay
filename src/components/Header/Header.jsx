import React from 'react';
import restaurantLogo from '../../assets/logo.jpg';
import styles from './Header.module.css';
import { restaurantConfig } from '../../data/restaurantConfig';
import { FaPhoneAlt, FaMapMarkerAlt, FaStar, FaClock } from 'react-icons/fa';

const RestaurantHeader = () => {
  const config = restaurantConfig;
  return (
    <header className={styles.orangeThemeHeader}>
      <div className={styles.headerTop}>
        <div className={styles.branding}>
          <img src={restaurantLogo} alt="Restaurant Logo" className={styles.logo} />
          <div className={styles.brandText}>
            <h1 className={styles.restaurantName}>{config.name}</h1>
            <p className={styles.cuisineType}>{config.cuisineType}</p>
            <div className={styles.ratingContainer}>
              <span className={styles.rating}>
                <FaStar className={styles.starIcon} />
                {config.rating}
              </span>
              <span className={styles.ratingCount}>{config.reviewCount}+ ratings</span>
            </div>
          </div>
        </div>
        
        <div className={styles.quickInfo}>
          <div className={styles.infoItem}>
            <FaClock className={styles.infoIcon} />
            <div>
              <p className={styles.infoLabel}>Delivery Time</p>
              <p className={styles.infoValue}>{config.deliveryTime} mins</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <div>
              <p className={styles.infoLabel}>Location</p>
              <p className={styles.infoValue}>{config.area}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.headerBottom}>
        <div className={styles.addressContainer}>
          <FaMapMarkerAlt className={styles.addressIcon} />
          <p className={styles.fullAddress}>{config.address}</p>
        </div>
        <div className={styles.contactContainer}>
          <a href={`tel:${config.phone}`} className={styles.phoneLink}>
            <FaPhoneAlt className={styles.phoneIcon} />
            {config.phone}
          </a>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;