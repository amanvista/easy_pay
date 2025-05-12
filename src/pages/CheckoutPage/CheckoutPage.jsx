import React from 'react';
import './CheckoutPage.css';
import Header from '../../components/Header/Header';
import { useScreenshotUpload } from './useScreenshotUpload';
import OrderSummary from './OrderSummary';
import CheckoutDetails from './CheckoutDetails';
import ScreenshotUploader from './ScreenShotUploader';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../app/slices/cartSlice';
import useRestaurant from '../../app/hooks/useRestaurant';

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const {restaurant} = useRestaurant();
  

  return (
    <>
      <Header />
      <div className="checkout-container">
        <OrderSummary cartItems={cartItems} total={total} restaurant={restaurant}/>
        <CheckoutDetails total={total} restaurant={restaurant}/>
      </div>
    </>
  );
};

export default CheckoutPage;