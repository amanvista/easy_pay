import { useState, useRef } from 'react';
import { showToast } from '../../components/common/Toast/Toast';

export const useScreenshotUpload = () => {
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      showToast('error', 'Please select an image file (JPEG, PNG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'File size should be less than 5MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setLocalImage({ file, preview: imageUrl });
    setPaymentScreenshot(imageUrl);
  };

  const handleRemoveImage = () => {
    if (paymentScreenshot) URL.revokeObjectURL(paymentScreenshot);
    setPaymentScreenshot(null);
    setLocalImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmUpload = async () => {
    if (!localImage) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', localImage.file);

    try {
      const response = await fetch('http://localhost/easy_pay_backend/api/file/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        const serverUrl = 'http://localhost/easy_pay_backend/api/file/uploads/' + result.filename;
        setPaymentScreenshot(serverUrl);
        URL.revokeObjectURL(localImage.preview);
        setLocalImage(null);
        showToast('success', 'File uploaded successfully!');
        return serverUrl;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('error', error.message || 'File upload failed!');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    paymentScreenshot,
    localImage,
    isUploading,
    fileInputRef,
    handleImageUpload,
    handleRemoveImage,
    handleConfirmUpload
  };
};