import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  registerUser,
  clearRegisterError,
  resetRegisterState
} from '../slices/registerSlice';

export const useRegister = () => {
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.register);

  // Wrapper for registration API call
  const register = useCallback(async ({ name, phone, email, password }) => {
    try {
      await dispatch(registerUser({ name, phone, email, password })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);

  // Clear registration-specific errors
  const resetError = useCallback(() => {
    dispatch(clearRegisterError());
  }, [dispatch]);

  // Reset full registration state (useful after form submission)
  const resetState = useCallback(() => {
    dispatch(resetRegisterState());
  }, [dispatch]);

  return {
    ...registerState,
    register,
    resetError,
    resetState,
  };
};
