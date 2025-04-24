import React, { useState, useEffect } from 'react';
import { restaurantConfig } from '../../data/restaurantConfig';
import ThemeSelector from '../../components/ThemSelector/ThemeSelector';
import MenuCategory from '../../components/MenuCategory/MenuCategory';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartSummary from '../../components/CartSummary/CartSummary';
import { menuData } from '../../data/menuData';
import Header from '../SearchPage/Header';
import RestaurantHeader from '../../components/Header/Header';

const MenuPage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(restaurantConfig.defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('restaurantTheme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  

  

  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('restaurantTheme', themeName);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header/>
      <RestaurantHeader config={restaurantConfig} />
      <div className="container">
        {menuData.categories.map(category => (
          <MenuCategory
            key={category.name}
            category={category}
          />
        ))}
      </div>
      <CartIcon itemCount={totalItems} toggleCart={toggleCart} />
      <CartSummary
        isVisible={showCart}
      />
    </div>
  );
};

export default MenuPage;