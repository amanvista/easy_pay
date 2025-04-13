import React from 'react';
import restaurantLogo from '../../assets/logo.jpg'; 
import styles from './Header.module.css';
import { restaurantConfig } from '../../data/restaurantConfig';

const Header = () => {
  const config = restaurantConfig
  return (
    <header>
      <div className="branding">
      <img src={restaurantLogo} alt="Restaurant Logo" className={styles.logo}  />
        <h1>{config.name}</h1>
        <p className="tagline">{config.tagline}</p>
        <div className="contact-info">
          {/* <span>Phone: {config.phone}</span> |  */}
          <span> {config.address}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;