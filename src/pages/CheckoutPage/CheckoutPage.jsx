import React from 'react';
import './CheckoutPage.css';
import Header from '../../components/Header/Header';
import { useScreenshotUpload } from './useScreenshotUpload';
import OrderSummary from './OrderSummary';
import CheckoutDetails from './CheckoutDetails';
import ScreenshotUploader from './ScreenShotUploader';

const CheckoutPage = () => {
  const {
    paymentScreenshot,
    localImage,
    isUploading,
    fileInputRef,
    handleImageUpload,
    handleRemoveImage,
    handleConfirmUpload
  } = useScreenshotUpload();

  return (
    <>
      <Header />
      <div className="checkout-container">
        <OrderSummary />
        <CheckoutDetails />
      </div>
    </>
  );
};

export default CheckoutPage;