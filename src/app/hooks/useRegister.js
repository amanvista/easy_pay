import { useState } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost/easy_pay_backend/api/register';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const register = async ({ name, phone, email, password }) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const response = await axios.post(API_URL, {
        name,
        phone,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      setIsSuccess(true);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);
  
  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  return {
    isLoading,
    error,
    isSuccess,
    register,
    resetError,
    resetState,
  };
};