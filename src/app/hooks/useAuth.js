import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginUser,logoutUser, checkAuth, clearError } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Wrapper for login API call (supports email/password)
  const login = useCallback(async (email, password) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error: error || 'Login failed. Please check your credentials.' };
    }
  }, [dispatch]);

  // Wrapper for logout
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  // Wrapper for checking auth status
  const verifyAuth = useCallback(async () => {
    try {
      await dispatch(checkAuth()).unwrap();
      return { isAuthenticated: true };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }, [dispatch]);

  // Clear errors
  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...authState,
    login,
    logout,
    verifyAuth,
    resetError,
    isAuthenticated: !!authState.userToken,
  };
};