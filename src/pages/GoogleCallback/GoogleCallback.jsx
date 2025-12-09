import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../app/slices/authSlice';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError('No authorization code received');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const handleGoogleAuth = async () => {
      try {
        // Call backend to exchange code for token
        const response = await axios.post(
          `${import.meta.env.VITE_USER_SERVICE_URL}/auth/google`,
          { code }
        );

        const { appToken, user } = response.data;

        // Store token
        localStorage.setItem('token', appToken);
        
        // Update Redux state
        dispatch(setUser(user));

        // Redirect to home
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Google authentication failed:', err);
        setError(err.response?.data?.message || 'Authentication failed');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleGoogleAuth();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin h-8 w-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Signing you in...</h2>
            <p className="text-gray-600">Please wait while we complete your authentication</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
