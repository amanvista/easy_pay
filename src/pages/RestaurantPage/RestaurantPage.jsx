// RestaurantPage.jsx
import React from 'react';
import './RestaurantPage.css';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard';
import Header from '../../components/Header/Header';

const menuItems = [
    {
      name: 'Margherita Pizza',
      description: 'Classic delight with 100% real mozzarella cheese',
      price: 299,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1681&q=80',
      isBestseller: true,
          category: 'Pizzas',

    },
    {
      name: 'Veggie Burger',
      description: 'Loaded with fresh veggies and sauces',
      price: 199,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1599&q=80',
      isBestseller: false,
    },
    {
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo sauce with penne pasta',
      price: 249,
      image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isBestseller: true,
    },
    {
      name: 'Chocolate Brownie',
      description: 'Rich chocolate brownie with nuts',
      price: 149,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
      isBestseller: false,
    },
  ];

const RestaurantPage = () => {
  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
  };

  return (
    <div> 
      <Header/>
    <div className="restaurant-page">
    <h1 className="restaurant-name">Delicious Bites</h1>
    <div className="menu-list">
        {menuItems.map((item, index) => (
        <MenuItemCard key={index} item={item} onAddToCart={handleAddToCart} />
        ))}
    </div>
    </div>
    </div>

  );
};

export default RestaurantPage;
