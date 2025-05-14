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
import useCart from '../../app/hooks/useCart';
import useOrder from '../../app/hooks/useOrder';

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  // const {restaurant} = useRestaurant();
  const {slotId,day,items,restaurantData} = useCart();
  const {createNewOrder} = useOrder();
  const handlePayNow = async () => {
    if (!slotId) {
      alert('Please select a time slot.');
      return;
    }

    const orderItems = items.map(item => ({
      menu_item_id: item.id,
      quantity: item.quantity
    }));
    const orderPayload = {
      user_id: 1, // Replace with actual logged-in user ID
      restaurant_id: restaurantData?.id,
      pickup_slot_id: slotId,
      special_instructions: "No onions in any items, please",
      items: [
        ...orderItems
      ]
    };
    await createNewOrder(orderPayload);
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <OrderSummary cartItems={cartItems} total={total} restaurant={restaurantData}/>
        <CheckoutDetails total={total} restaurant={restaurantData} handlePayNow={handlePayNow}/>
      </div>
    </>
  );
};

export default CheckoutPage;