import React, { useState, useEffect } from 'react';
import { restaurantConfig } from '../../data/restaurantConfig';
import MenuCategory from '../../components/MenuCategory/MenuCategory';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartSummary from '../../components/CartSummary/CartSummary';
import { menuData } from '../../data/menuData';
import Header from '../SearchPage/Header';
import RestaurantHeader from '../../components/Header/Header';
import useRestaurant from '../../app/hooks/useRestaurant';
import { useQuery } from '../../app/hooks/useQuery';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const MenuPage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(prev => !prev);
  };
  const {
    restaurant,
    menuItems,
    restaurantLoading,
    menuItemsLoading,
    restaurantError,
    menuError,
    fetchRestaurantDetails,
    fetchRestaurantMenuItems
  } = useRestaurant();
  const {id} = useQuery('id');
  useEffect(()=>{
    if(id)
    fetchRestaurantDetails(id)
    fetchRestaurantMenuItems(id)
  },[id])

console.log(menuItems)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div>
      <Header/>
      <RestaurantHeader 
      restaurant={restaurant}
      loading={restaurantLoading}
      error={restaurantError}
      />
      <div className="container">
        {!menuItemsLoading && menuError && <>Error loading Menu Items</>}
        {menuItemsLoading && <LoadingSpinner size="medium" color="#3498db" />}
        {!menuError && !menuItemsLoading && 
          Object.entries(menuItems || {}).map(([categoryName, items]) => (
            <MenuCategory
              key={categoryName}
              category={{ name: categoryName, items }}
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