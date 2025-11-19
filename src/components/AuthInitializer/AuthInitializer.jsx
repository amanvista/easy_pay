import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../app/slices/authSlice';

/**
 * AuthInitializer component verifies authentication token on app startup
 * This ensures the Redux auth state is synchronized with the actual authentication status
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('userToken');
    
    // If token exists, verify it with the backend
    if (token) {
      dispatch(checkAuth()).catch((error) => {
        // Token is invalid/expired - checkAuth reducer will clear it
        console.log('Initial auth check failed:', error);
      });
    }
    // If no token, loading state is already false from initialState
  }, [dispatch]);

  return children;
};

export default AuthInitializer;

