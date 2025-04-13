import React, { useState, useEffect } from 'react';
import { restaurantConfig } from '../../data/restaurantConfig';
import Header from '../../components/Header/Header';
import ThemeSelector from '../../components/ThemSelector/ThemeSelector';
import MenuCategory from '../../components/MenuCategory/MenuCategory';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartSummary from '../../components/CartSummary/CartSummary';
import { menuData } from '../../data/menuData';

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

  const addToCart = (itemId) => {
    const item = menuData.categories
      .flatMap(category => category.items)
      .find(item => item.id === itemId);

    if (!item) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };

  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderDetails = cart
      .map(item => `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    alert(`Order placed with ${restaurantConfig.name}!\n\n${orderDetails}\n\nTotal: $${total.toFixed(2)}\n\nThank you for your order!`);

    setCart([]);
    setShowCart(false);
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('restaurantTheme', themeName);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header config={restaurantConfig} />
      <div className="container">
        {menuData.categories.map(category => (
          <MenuCategory
            key={category.name}
            category={category}
            addToCart={addToCart}
          />
        ))}
      </div>
      <CartIcon itemCount={totalItems} toggleCart={toggleCart} />
      <CartSummary
        cart={cart}
        removeFromCart={removeFromCart}
        total={totalPrice}
        checkout={checkout}
        isVisible={showCart}
      />
    </div>
  );
};

export default MenuPage;